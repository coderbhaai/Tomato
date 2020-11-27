<?php

namespace App\Http\Controllers;
use DB;
use File;
use Mail;
use JWTAuth;
use App\User;
use App\Meta;
use App\Blogs;
use App\Basic;
use App\Products;
use App\Orders;
use App\Contact;
use App\Country;
use App\Coupon;
use App\Shipping;
use App\Comments;
use App\BlogMeta;
use JWTAuthException;
use App\Mail\CommentDone;
use Illuminate\Http\Request;

class AdminController extends Controller
{

// User Functions
    public function contactForm(Request $request){
        $dB                   =   new Contact;
        $dB->name             =   $request->name;
        $dB->email            =   $request->email;
        $dB->phone            =   $request->phone;
        $dB->message          =   $request->message;
        $dB->_token   =   "22";
        $dB-> save();
        $response = ['success'=>true, 'response'=>'Form filled succesfully'];
        return response()->json($response, 201);
    }

    public function fetchBlog($url, $type){
        $empty =    false;
        if($type == "All"){ 
            $blogs      = Blogs::select('id', 'title', 'url', 'cover_img', 'updated_at')->orderBy('id', 'desc')->get();
            $name       = "All";
        }
        if($type == "category"){
            $catName    = BlogMeta::where('url', $url)->where('type', 'category')->select('name')->first(); 
            $name       = $catName->name;
            $blogs      = Blogs::where('category', 'Like', '%' . $name. '%')->orderBy('id', 'desc')->select('id', 'title', 'url', 'cover_img', 'updated_at')->get();
        }
        if($type == "tag"){ 
            $tagName    = BlogMeta::select('name')->where('url', $url)->first();
            $name       = $tagName->name;
            $blogs      = Blogs::where('tag', 'Like', '%' . $name. '%')->orderBy('id', 'desc')->select('id', 'title', 'url', 'cover_img', 'updated_at')->get();
        }
        if($type == "search"){
            $blogs      = Blogs::where('content', 'Like', '%' . $url. '%')
            ->orWhere('title', 'Like', '%' . $url. '%')->orderBy('id', 'desc')
            ->select(DB::raw('cover_img, title, id, url'))
            ->get();
            $name       = $url;
        }
        // $empty =    count($blogs);
        if( count($blogs) ==0 ){
            $empty = true;
            $blogs      = Blogs::select('id', 'title', 'url', 'cover_img', 'updated_at')->orderBy('id', 'desc')->get();
        }
        return response()->json([
            'blogs'         => $blogs,
            'name'          =>  $name,
            'type'          =>  $type,
            'empty'         =>  $empty
        ]);
    }

    public function blogSingle($url){
        $blogSingle     = Blogs::where('url', $url)->first();
        $comments       = Comments::where('blogId', $blogSingle->id)->where('c_order', '0')->where('status', 1)->select('id','c_order', 'user', 'commentId', 'comment', 'updated_at')->orderBy('id', 'DESC')->get();
        $response       = Comments::where('blogId', $blogSingle->id)->where('c_order', '1')->where('status', 1)->select('id','c_order', 'user', 'commentId', 'comment', 'updated_at')->get();
        $suggestBlogs   = Blogs::where('url', '!=', $url)->select('url', 'cover_img', 'title')->inRandomOrder()->limit(6)->get();
        $cats           = BlogMeta::where('type', 'category')->select('name', 'url')->get();
        $tags           = BlogMeta::where('type', 'tag')->select('name', 'url')->get();
        $blogList       = Blogs::select('title', 'url')->get();
        $response       = [
            'success'           =>true,
            'blogSingle'        => $blogSingle,
            'comments'          => $comments,
            'response'          => $response,
            'suggestBlogs'      => $suggestBlogs,
            'cats'              => $cats,
            'tags'              => $tags,
            'blogList'          => $blogList
        ];
        return response()->json($response, 201);
    }

    public function checkCoupon($coupon){
        $discount     = Coupon::select('amount')->where('code', $coupon)
                        ->select('amount')
                        ->whereDate('from', '<=', date("Y-m-d"))
                        ->whereDate('to', '>=', date("Y-m-d"))
                        ->first();
        if($discount){
            $response       = ['success' =>true, 'discount' => $discount->amount, 'response'=>'We are happy to provide you discount of <strong>'.$discount.'</strong>'];
        }else{
            $response       = ['success' =>false, 'discount' => null, 'xx'=>$discount, 'response'=>'Sorry, the coupon is invalid or expired' ];
        }
        return response()->json($response, 201);
    }

// User Functions

// Admin Functions
    public function fetchContactForm(){
        $lead = Contact::all();
        return response()->json([ 'data' => $lead ]);  
    }

    // Meta Tag
        public function getMeta(){
            $metas = Meta::all();
            return response()->json([
                'datax' => $metas
            ]); 
        }

        public function addMeta(Request $request){
            $datax = $request->all();
            if(Meta::where('url',  $request->url)->exists()){
                $response = ['success'=>false, 'response'=> "Meta for this URL already exists"];
            }else{
                $meta                   =   new Meta;     
                $meta->url              =   $request->url;
                $meta->title            =   $request->title;
                $meta->description      =   $request->description;
                $meta->keyword          =   $request->keyword;
                $meta->remember_token   =   "22";
                $meta-> save();
                $data = Meta::where('url', $request->url)->first();
                $response = ['success'=>true, 'data' => $data, 'response'=>'Meta Tag added Succesfully'];
            }

            return response()->json($response, 201);
        }

        public function updateMeta(Request $request){
                $meta                   =   Meta::find($request->id);
                $meta->url              =   $request->url;
                $meta->title            =   $request->title;
                $meta->description      =   $request->description;
                $meta->keyword          =   $request->keyword;
                $meta->remember_token   =   "22";
                $meta-> save();
                $data = Meta::where('id', $request->id)->first();
                $response = ['success'=>true, 'data' => $data, 'response'=>'Meta Tag updated Succesfully'];
                return response()->json($response);
        }
    // Meta Tag
    // Basics
        public function fetchBasic(){
            $basic = Basic::all();
            return response()->json([
                'data' => $basic
            ]); 
        }

        public function addBasic(Request $request){
            $dB                   =   new Basic;     
            $dB->type             =   $request->type;
            $dB->name             =   $request->name;
            $dB->url              =   $request->url;
            $dB->remember_token   =   "22";
            $dB-> save();
            
            $data = Basic::limit(1)->orderBy('id', 'desc')->first();
            $response = ['success'=>true, 'data' => $data, 'response'=>'Basic data added Succesfully'];
            return response()->json($response, 201);
        }

        public function updateBasic(Request $request){
                $dB                   =   Basic::find($request->id);
                $dB->type             =   $request->type;
                $dB->name             =   $request->name;
                $dB->url              =   $request->url;
                $dB-> save();
                
                $data = Basic::where('id', $request->id)->first();
                $response = ['success'=>true, 'data' => $data, 'response'=>'Basic data updated Succesfully'];
            return response()->json($response, 201);
        }
    // Basics
    // Blog Meta
        public function fetchBlogMetaList(){
            $blogmetas = BlogMeta::select('type', 'name', 'url', 'id')->get();
            return response()->json([
                'data' => $blogmetas
            ]); 
        }

        public function addBlogMeta(Request $request){
            if(BlogMeta::where('url', $request->url)->where('type', $request->type)->exists()){
                $response = ['success'=>false, 'response' => "Error: Duplicate Entry. Please check"];
            }else{
                $dB                   =   new BlogMeta;
                $dB->type             =   $request->type;
                $dB->name             =   $request->name;
                $dB->url              =   $request->url;
                $dB->remember_token   =   "22";
                $dB-> save();

                $data = BlogMeta::where('url', $request->url)->first();
                $response = ['success'=>true, 'data' => $data, 'response'=>'Blog Meta Added Succesfully'];
            }
            return response()->json($response, 201);
        }

        public function updateBlogMeta(Request $request){
            $dB                   =   BlogMeta::find($request->id);     
            $dB->type             =   $request->type;
            $dB->name             =   $request->name;
            $dB->url              =   $request->url;
            $dB-> save();
            $data = BlogMeta::where('id', $request->id)->first();
            $response = ['success'=>true, 'data' => $data, 'response'=>'Blog Meta Updated Succesfully'];
            return response()->json($response, 201);
        }
    // Blog Meta
    // Products
        public function productCategory(){
            $basic = Basic::where('type', 'prod-category')->select('name', 'url')->get();
            $basicOptions = DB::table('basics')
                        ->select(DB::raw('name as text, id as value, url as url, id as id'))
                        ->where('type', "prod-category")
                        ->get();
            return response()->json([
                'data'              => $basic,
                'basicOptions'      => $basicOptions,
            ]); 
        }

        public function addProduct(Request $request){
            $dB                     =   new Products;     
            $dB->name               =   $request->name;
            $dB->url                =   $request->url;
            $dB->sale               =   $request->sale;
            $dB->category           =   $request->category;
            $dB->short_desc         =   $request->short_desc;
            $dB->long_desc          =   $request->long_desc;
            $dB->sku                =   $request->sku;
            $dB->remember_token     =   "22";
            if ($request->hasFile('images')) {
                $count = 0;
                $imageArray = [];
                foreach ($request->file('images') as $file) {
                    $count = $count + 1;
                    $fileName = time() . '-' . $count . '.' . $file->getClientOriginalExtension();
                    $file->move(storage_path('app/public/product/'), $fileName);    
                    $imageArray[] = $fileName;
                }
                $dB->images = json_encode($imageArray);
            }
            $dB-> save();
            $response = ['success'=>true, 'response'=>'Product added Succesfully'];
            return response()->json($response, 201);
        }

        public function fetchAdminProducts(){
            $products =         DB::table('products')
                                ->leftJoin('basics', 'basics.id', '=', 'products.category')
                                ->select([ 'products.id', 'products.name', 'products.category', 'products.images', 'products.url', 'products.sku', 'products.sale', 'products.short_desc', 'products.long_desc', 'products.display',  'basics.name as catName', 'basics.url as catUrl', 'basics.id as catId' ])
                                ->get();

            return response()->json([ 'data' =>  $products ]);
        }

        public function updateProduct(Request $request){
            $dB                     =   Products::find($request->id);
            $dB->name               =   $request->name;
            $dB->url                =   $request->url;
            $dB->sale               =   $request->sale;
            $dB->category           =   $request->category;
            $dB->short_desc         =   $request->short_desc;
            $dB->long_desc          =   $request->long_desc;
            $dB->sku                =   $request->sku;
            $dB->remember_token     =   "22";
            if ($request->hasFile('images')) {
                $count = 0;
                $imageArray = [];
                foreach ($request->file('images') as $file) {
                    $count = $count + 1;
                    $fileName = time() . '-' . $count . '.' . $file->getClientOriginalExtension();
                    $file->move(storage_path('app/public/product/'), $fileName);    
                    $imageArray[] = $fileName;
                }
                if(!is_null($dB->images)){
                    foreach(json_decode($dB->images) as $xx){
                        $deleteImage = public_path("storage/product/{$xx}");        
                        if (isset($deleteImage)) { file::delete($deleteImage);  }
                    }
                }
                $dB->images = json_encode($imageArray);
            }
            $dB-> save();

            $products =         DB::table('products')
                                ->leftJoin('basics', 'basics.id', '=', 'products.category')
                                ->select([ 'products.id', 'products.name', 'products.category', 'products.url', 'products.images', 'products.sku', 'products.sale', 'products.short_desc', 'products.long_desc', 'products.display',  'basics.name as catName', 'basics.url as catUrl', 'basics.id as catId' ])
                                ->where('products.id', $request->id)
                                ->first();
            
                                $response = ['success'=>true, 'data' => $products, 'response'=>'Product updated Succesfully'];
            return response()->json($response, 201);
        }
    // Products
    // Blogs
        public function blogMetaData(){
            $catList = DB::table('blog_metas')->select(DB::raw('name as text, name as value, url as url, id as id'))->where('type', "category")->get();
            $tagList = DB::table('blog_metas')->select(DB::raw('name as text, name as value, url as url, id as id'))->where('type', "tag")->get();
            return response()->json([
                'catList' => $catList,
                'tagList' => $tagList,
            ]); 
        }

        public function blogList(){
            $blogs =  Blogs::all();
            
            return response()->json([ 'success' => true, 'blogs' => $blogs ]);
        }

        public function addBlog(Request $request){
            if(Blogs::where('url', $request->url)->exists()){
                $response = ['success'=>false, 'response' => "Error: Duplicate Blog URL"];
            }else{
                $blog                   =   new Blogs;     
                $blog->title            =   $request->title;
                $blog->url              =   $request->url;
                $blog->category         =   $request->category;
                $blog->tag              =   $request->tag;
                $blog->content          =   $request->content;
                $blog->display          =   "1";
                $blog->remember_token   =   "22";
                if ($request->file !== 'null') {
                    $fileName = time() . '.' . request()->file->getClientOriginalExtension();
                    request()->file->move(storage_path('app/public/blog/'), $fileName);
                    $blog->cover_img = $fileName;
                }
                $blog-> save();
                $data = Blogs::limit(1)->orderBy('id', 'desc')->first();
                $response = ['success'=>true, 'data' => $data, 'response' => "Blog Added succesfully"];
            }
            return response()->json($response, 201);
        }

        public function updateBlog(Request $request){
            $blog                   =   Blogs::find($request->id);     
            $blog->title            =   $request->title;
            $blog->url              =   $request->url;
            $blog->category         =   $request->category;
            $blog->tag              =   $request->tag;
            $blog->content          =   $request->content;
            $blog->display          =   "1";
            if($request->file !== 'null'){
                $fileName = time() . '.' . request()->file->getClientOriginalExtension();
                request()->file->move(storage_path('app/public/blog/'), $fileName);

                if(!is_null( $blog->cover_img)){
                    $deleteImage = public_path("storage/blog/{$blog->cover_img}");        
                    if (isset($deleteImage)) { file::delete($deleteImage); }
                }
                $blog->cover_img = $fileName;
            }
            $blog-> save();
            $data = Blogs::where('id', $request->id)->orderBy('id', 'desc')->first();
            $response = ['success'=>true, 'data'=>$data, 'response' => "Blog Updated succesfully"];
        
            return response()->json($response, 201);
        }


    // Blogs
    // Comments
        public function fetchComments(){
            $comments = Comments::select('id', 'user', 'email', 'comment', 'status', 'blogId', 'updated_at')->orderBy('id', 'DESC')->get()->map(function($i) {
                $blog   =   Blogs::select('url', 'title')->where( 'id', $i->blogId )->first();
                $i['blog']  =   $blog;
                return $i;
            });
            return response()->json([
                'datax' => $comments
            ]); 
        }

        public function addComment(Request $request){
            $dB                     =   new Comments;     
            $dB->blogId             =   $request->id;
            $dB->c_order            =   $request->order;
            $dB->commentId          =   $request->commentId;
            $dB->user               =   $request->name;
            $dB->email              =   $request->email;
            $dB->comment            =   $request->comment;
            $dB->status             =   $request->status;
            $dB->remember_token     =   "22";
            $dB-> save();
            if($request->name !=='AmitKK'){
                $x = $request->all();
                Mail::to('amit.khare588@gmail.com')->send(new CommentDone($x)); 
            }
            $response = ['success'=>true, 'response'=>'Comment added succesfully for review'];
            return response()->json($response, 201);
        }

        public function updateComment(Request $request){
            $datax      =   $request->all();
            if($request->status == 'delete'){
                Comments::where('id', $request->id)->delete();
                $response = ['response'=>'Comment delete succesfully'];
            }else{
                $dB                     =   Comments::where('id', $request->id)->first();
                $dB->user               =   $request->name;
                $dB->email              =   $request->email;
                $dB->comment            =   $request->comment;
                $dB->status             =   $request->status;
                $dB->save();
                $comment        = Comments::select('id', 'user', 'email', 'comment', 'status', 'blogId', 'updated_at')->where('id', $request->id)->get()->map(function($i) {
                    $blog   =   Blogs::select('url', 'title')->where( 'id', $i->blogId )->first();
                    $i['blog']  =   $blog;
                    return $i;
                });
                $response       = ['success'=>true, 'data'=>$comment[0], 'response'=>'Comment updated succesfully'];
            }
            return response()->json($response, 201);
        }
    // Comments
    // Orders
        public function getAdminOrders(){
            $orders = Orders::select('id', 'user', 'order', 'payment', 'total', 'status', 'remarks')->get();
            return response()->json([
                'data' => $orders
            ]); 
        }

        public function updateOrder(Request $request){
            $dB                   =   Orders::find($request->id);
            $dB->remarks          =   $request->remarks;
            $dB-> save();
            $data = Orders::select('id', 'user', 'order', 'payment', 'total', 'status', 'remarks')->where('id', $request->id)->first();
            $response = ['success'=>true, 'data' => $data, 'response'=>'Order updated Succesfully'];
            return response()->json($response);
        }
    // Orders
    // Coupons
        public function getCoupon(){
            $coupons = Coupon::all();
            return response()->json([
                'data' => $coupons
            ]); 
        }

        public function addCoupon(Request $request){
            $dB                     =   new Coupon;
            $dB->code               =   $request->code;
            $dB->type               =   $request->type;
            $dB->from               =   $request->from;
            $dB->to                 =   $request->to;
            $dB->amount             =   $request->amount;
            $dB->remarks            =   $request->remarks;
            $dB-> save();
            $data = Coupon::limit(1)->orderBy('id', 'desc')->first();
            $response = ['success'=>true, 'data' => $data, 'response'=>'Coupon added Succesfully'];
            return response()->json($response, 201);
        }

        public function updateCoupon(Request $request){
                $dB                     =   Coupon::find($request->id);
                $dB->code               =   $request->code;
                $dB->type               =   $request->type;
                $dB->from               =   $request->from;
                $dB->to                 =   $request->to;
                $dB->amount             =   $request->amount;
                $dB->remarks            =   $request->remarks;
                $dB-> save();
                $data = Coupon::where('id', $request->id)->first();
                $response = ['success'=>true, 'data' => $data, 'response'=>'Coupon updated Succesfully'];
                return response()->json($response);
        }
    // Coupons
    // Shipping
        public function getShipping(){
            $ship           = Shipping::select('id', 'region', 'name', 'shippingtype', 'amount', 'remarks')->get();
            $stateShip      = Shipping::select('id', 'name', 'shippingtype', 'amount', 'remarks')->where('region', 'State')->get();
            $cityShip       = Shipping::select('id', 'name', 'shippingtype', 'amount', 'remarks')->where('region', 'City')->get();
            return response()->json([
                'data'              => $ship,
                'stateShip'         => $stateShip,
                'cityShip'          => $cityShip
            ]); 
        }

        public function addShipping(Request $request){
            $dB                     =   new Shipping;
            $dB->region             =   $request->region;
            $dB->name               =   $request->name;
            $dB->shippingtype       =   $request->type;
            $dB->amount             =   $request->amount;
            $dB->remarks            =   $request->remarks;
            $dB-> save();
            $data = Shipping::limit(1)->orderBy('id', 'desc')->first();
            $response = ['success'=>true, 'data' => $data, 'response'=>'Shipping added Succesfully'];
            return response()->json($response, 201);
        }

        public function updateShipping(Request $request){
                $dB                     =   Shipping::find($request->id);
                $dB->region             =   $request->region;
                $dB->name               =   $request->name;
                $dB->shippingtype       =   $request->type;
                $dB->amount             =   $request->amount;
                $dB->remarks            =   $request->remarks;
                $dB-> save();
                $data = Shipping::where('id', $request->id)->first();
                $response = ['success'=>true, 'data' => $data, 'response'=>'Shipping updated Succesfully'];
                return response()->json($response);
        }
    // Shipping
    // Products
    
    // Products

    // Cart System
    
    // Cart System

// Admin Functions















    
    public function fetchMeta($url){
        $metas = Meta::where('url', $url)->first();
        if(!$metas){
            $metas = Meta::where('url', 'default')->first();
        }
        return response()->json([ 'datax' => $metas ]);  
    }



    public function fetchCatItems($category){
        if($category==='All'){
            $products        =   DB::table('products')
                                ->leftJoin('basics', 'basics.id', '=', 'products.category')
                                ->select([ 'products.id', 'products.name', 'products.images', 'products.url', 'products.sku', 'products.sale', 'products.short_desc', 'products.long_desc', 'basics.name as catName', 'basics.url as catUrl', 'basics.id as catId' ])
                                ->get()->map(function($i) {
                                    $i->qtySelected=  json_decode( json_decode($i->sku)[0])[0];
                                    $i->priceSelected=  json_decode( json_decode($i->sku)[0])[1];
                                    return $i;
                                });
            $name           =   '<h1 class="heading">Shop Page</h1>';
        }else{
            $cat             = Basic::select( 'id', 'name' )->where('type', 'prod-category')->where('url', $category)->first();
            $products        =   DB::table('products')
                                ->leftJoin('basics', 'basics.id', '=', 'products.category')
                                ->select([ 'products.id', 'products.name', 'products.images', 'products.url', 'products.sku', 'products.sale', 'products.short_desc', 'products.long_desc', 'basics.name as catName', 'basics.url as catUrl', 'basics.id as catId' ])
                                ->where('products.category', $cat->id)
                                ->get();
            $name           =   '<h1 class="heading">Shop for '.$cat->name.'</h1>';
        }
        return response()->json([
            'data'          =>  $products,
            'name'          =>  $name
        ]);
    }

    public function productList(){
        $cat             = Basic::select( 'id' )->where('type', 'prod-category')->get();
        $products = [];
        for( $i=0; $i<count( $cat ); $i++  ){
            $xx =    DB::table('products')
                    ->leftJoin('basics', 'basics.id', '=', 'products.category')
                    ->select([ 'products.id', 'products.name', 'products.images', 'products.url', 'products.sku', 'products.sale', 'basics.name as catName', 'basics.url as catUrl' ])
                    ->where('products.category', $cat[$i]->id)
                    ->get();
            array_push($products, $xx);
        }
        return response()->json([
            'products'        =>  $products
        ]);
    }

    public function fetchProduct($url){
        $product        =   DB::table('products')
                            ->leftJoin('basics', 'basics.id', '=', 'products.category')
                            ->select([ 'products.id', 'products.name', 'products.images', 'products.url', 'products.sku', 'products.sale', 'products.short_desc', 'products.long_desc', 'basics.name as catName', 'basics.url as catUrl', 'basics.id as catId' ])
                            ->where('products.url', $url)
                            ->get()->map(function($i) {
                                $i->qtySelected=  json_decode( json_decode($i->sku)[0])[0];
                                $i->priceSelected=  json_decode( json_decode($i->sku)[0])[1];
                                return $i;
                            });

        $related        =   DB::table('products')
                            ->leftJoin('basics', 'basics.id', '=', 'products.category')
                            ->select([ 'products.id', 'products.name', 'products.images', 'products.url', 'products.sku', 'products.sale', 'basics.name as catName', 'basics.url as catUrl', 'basics.id as catId' ])
                            ->limit(8)
                            ->where('products.category', $product[0]->catId )
                            ->where('products.url','!=',$url )
                            ->inRandomOrder()->limit(12)->get();

        return response()->json([
            'product'           =>  $product[0],
            'related'           =>  $related,
            'cat'               =>  $product[0]->id
        ]);
    }

    public function headerList(){
        $cat             = Basic::select( 'id' )->where('type', 'prod-category')->get();
        $products = [];
        for( $i=0; $i<count( $cat ); $i++  ){
            $xx =    DB::table('products')
                    ->leftJoin('basics', 'basics.id', '=', 'products.category')
                    ->select([ 'products.name', 'products.url', 'basics.name as catName', 'basics.url as catUrl' ])
                    ->where('products.category', $cat[$i]->id)
                    ->inRandomOrder()->limit(8)->get();
            array_push($products, $xx);
        }
        return response()->json([
            'products'        =>  $products
        ]);
    }

    public function postOrder(Request $request){
        $dB                     =   new Orders;
        $dB->user               =   $request->user;
        $dB->order              =   $request->order;
        $dB->payment            =   $request->payment;
        $dB->total              =   $request->total;
        $dB->status             =   $request->status;
        $dB->paymentId          =   $request->paymentId;
        $dB->payment            =   $request->longurl;
        $dB->remember_token     =   "22";
        if(!$request->userId){
            $user   = $this->register($request->name, $request->email);
            $dB->userId         =   $user['user']->id;
            $newUser            =   $user;
        }else{
            $dB->userId         =   $request->userId;
            $newUser            =   false;
        }
        $dB-> save();
        $order  = Orders::limit(1)->orderBy('id', 'desc')->first();
        $response = [
            'success'           =>  true,
            'order'             =>  $order,
            'response'          =>  'Order submitted succesfully',
            'newUser'           =>  $newUser
        ];
        return response()->json($response, 201);
    }

    // Auth System to create account for users who have ordered but have not created an account
        private function getToken($email, $password)    {
            $token = null;
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
    
        private function register($name, $email){
            // Create random password
            $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
            $pass = array(); //remember to declare $pass as an array
            $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
            for ($i = 0; $i < 8; $i++) {
                $n = rand(0, $alphaLength);
                $pass[] = $alphabet[$n];
            }
            $password =  implode($pass); //turn the array into a string
            // Create random password
            $payload = [
                'password'=>\Hash::make($password),
                'email'=>$email,
                'name'=>$name,
                'role'=>'User',
                'remember_token'=> ''
            ];
            $existing = User::where('email', '=', $email)->first();
            if (!is_null($existing)) {
                $user = User::where('email', $email)->get()->first();
                $response = ['success'=>true, 'user'=>$user, 'response'=>'Email already Registered'];
                return $response;
            }
            
            $user = new \App\User($payload);
            if ($user->save()){
                $token = self::getToken($email, $password);
                if (!is_string($token))  return response()->json(['success'=>false,'response'=>'Token generation failed'], 201);            
                $user = \App\User::where('email', $email)->get()->first();            
                $user->remember_token = $token;
                $user->save();
                $user = User::limit(1)->orderBy('id', 'desc')->where('email', $email)->first();
                $response = ['success'=>true, 'user'=>$user, 'response'=> 'Account created'];
            }
            else
                $response = ['success'=>false, 'response'=>'Some other issue with Auth'];
            return $response;
        }
    // Auth System

    public function submitPayment(Request $request){
        $dB                     =   Orders::where('paymentId', $request->paymentRequestId)->first();
        $dB->payment            =   $request->payment;
        $dB->status             =   'Paid';
        $dB-> save();
        
        $user                   =   Orders::select('userId')->where('paymentId', $request->paymentRequestId)->first();
        $orders                 =   Orders::select('user', 'order', 'payment', 'total', 'status', 'updated_at')->where('userId', $user['userId'])->orderBy('id', 'desc')->get();
        $response = [
            'success'           =>  true,
            'response'          =>  'payment received succesfully',
            'orders'            =>  $orders
        ];
        return response()->json($response, 201);
    }

    public function getOrders($id){
        $orders        =   Orders::select('user', 'order', 'payment', 'total', 'status', 'updated_at', 'remarks')->where('userId', $id)->orderBy('id', 'desc')->get();
        return response()->json([
            'orders'          =>  $orders
        ]);
    }
    

}