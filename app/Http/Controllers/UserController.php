<?php
namespace App\Http\Controllers;
use DB;
use Mail;
use JWTAuth;
use App\User;
use JWTAuthException;
use Illuminate\Http\Request;
use App\Mail\ForgotPassword;

class UserController extends Controller
{
    private function getToken($email, $password)    {
        $token = null;
        //$credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt( ['email'=>$email, 'password'=>$password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token'=>$token
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }
        return $token;
    }

    public function register(Request $request){ 
        $payload = [
            'password'=>\Hash::make($request->password),
            'email'=>$request->email,
            'name'=>$request->name,
            'role'=>$request->role,
            'remember_token'=> ''
        ];
        $existing = User::where('email', '=', $request->email)->first();
        if (!is_null($existing)) {
            $response = ['success'=>false, 'response'=>'Email already Registered'];   
            return response()->json($response, 201);          
        }

        if($request->password_confirmation === $request->password){
        }else{
            $response = ['success'=>false, 'response'=>'Password Mismatch'];   
            return response()->json($response, 201);
        }
        
        $user = new \App\User($payload);
        if ($user->save()){            
            $token = self::getToken($request->email, $request->password);
            if (!is_string($token))  return response()->json(['success'=>false,'response'=>'Token generation failed'], 201);            
            $user = \App\User::where('email', $request->email)->get()->first();            
            $user->remember_token = $token;    
            $user->save();    
            $response = ['success'=>true, 'data'=>['name'=>$user->name,'id'=>$user->id,'email'=>$request->email,'remember_token'=>$token, 'role'=>$request->role], 'response'=> 'Registration Successful.. Login Now'];        
        }
        else
            $response = ['success'=>false, 'response'=>'Some other issue with Auth'];
        return response()->json($response, 201);
    }
         
    public function login(Request $request){
        $user = User::where('email', $request->email)->first();
        if(!(User::where('email', $request->email)->exists())){
            $response = ['success'=>false, 'response'=>"No account by this name. Please register"];
        }elseif($user && \Hash::check($request->password, $user->password)){ // The passwords match...
                $token = self::getToken($request->email, $request->password);
                $user->remember_token = $token;
                $user->save();
                $response = ['success'=>true, 'user' => $user, 'response'=> 'Welcome, You are logged in'];
            }
            else {
                $response = ['success'=>false, 'response' => "Password is Incorrect. Please try again"];
            }
            return response()->json($response, 201);
    }

    public function forgotPassword(Request $request){
        $user = User::where('email', $request->email)->get()->first();
        if(is_null($user)){
            $response = ['success'=>false, 'response'=>"No account by this name. Please register"];
        }else{
            $token = substr(sha1(rand()), 0, 30);
            $date = now();
            DB::table('password_resets')
                ->updateOrInsert(
                    ['email' => $request->email],
                    ['token' => $token, 'created_at' => $date]
                );
            Mail::to( $request->email)->send(new ForgotPassword($token, $user)); 
            $response = ['success'=>true, 'response' => "Password Reset Email Sent. Please Check"];
        }
        return response()->json($response, 201);
    }

    public function resetPassword(Request $request){
        $user =     User::where('email', $request->email)->first();
        $valid =    DB::table('password_resets')
                        ->where('email', $request->email)
                        ->where('token', $request->token)
                        ->first();
        if(is_null($user)){
            $response = ['success'=>false, 'response'=>"No account by this name. Please register"];
        }elseif($request->confirm_password !== $request->password){
            $response = ['success'=>false, 'response'=>'Password Mismatch'];   
            return response()->json($response, 201);
        }elseif(is_null($valid)){
            $response = ['success'=>false, 'response'=>'You did not ask for Password Reset'];
        }else{
                $token = substr(sha1(rand()), 0, 30);
                // $token = self::getToken($request->email, $request->password);
                // if (!is_string($token))  return response()->json(['success'=>false,'response'=>'Token generation failed', 'token'=>$token], 201);
                $user->password =    \Hash::make($request->password);
                $user->remember_token = $token;
                $user->save();
                DB::delete('delete from password_resets where token = ?',[$request->token]);

                $response = ['success'=>true, 'response' => "Password has been Reset. Please Login", 'valid'=>$valid];
            }
        
        return response()->json($response, 201);
    }
}