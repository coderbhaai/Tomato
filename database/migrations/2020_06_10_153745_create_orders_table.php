<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table){
            $table->bigIncrements('id');
            $table->string('userId')->nullable();
            $table->mediumText('user');
            $table->mediumText('order');
            $table->string('payment')->nullable();
            $table->string('total');
            $table->string('status');
            $table->mediumText('remarks')->nullable();
            $table->string('paymentId');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
