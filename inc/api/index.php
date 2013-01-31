<?php
/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */
require 'Slim/Slim.php';
require "rb.php";

 R::setup('mysql:host=localhost;
        dbname=taskmanager','root','');
 
 //R::freeze();

\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, and `Slim::delete`
 * is an anonymous function.
 */

// GET route


// POST route
$app->post('/user', 'createUser');
$app->get('/user', 'getUser');

$app->get("/activate-user","activateUser");



/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();



function createUser(){
    global $app;
    $userData_obj = json_decode($app->request()->getBody(),false);
    if (isset($userData_obj)){

        $user = R::dispense('user');

        $user->name = $userData_obj->user_name;
        $user->email = $userData_obj->user_email;
        $user->password = $userData_obj->user_password;
        
        $user->activationkey =  sha1(mt_rand(10000,99999).time().$userData_obj->user_email);
        $user->status = "inactive";

        $user_id = R::store($user);
        
        $email_path = $_SERVER['SERVER_ADDR'].dirname($_SERVER['SCRIPT_NAME'])."/activate-user?activationKey=".$user->activationkey."&userId=".$user_id;

        echo '{"user_id":"'.$user_id.'", "success":"true", "email_path":"'.$email_path.'"}';
    }
    else {
        echo '{"success":"false","error":"User could not be saved on server!"}';
    }
    //echo json_encode($userData_obj);
}

function getUser(){
    // echo ;
    //var_dump($_SERVER);
}

function activateUser(){
    global $app;
    $key = $app->request()->params('activationKey');
    $user_id = $app->request()->params('userId');

    $user = R::load('user',$user_id);
    if ($user->id && $key == $user->activationkey && $user->status == "inactive"){
        $user->status = "active";
        $user->startdate = getCurrentDate();
        R::store($user);
        echo "success!"; 
    }
    //echo "key:$key, userid: $user_id";
}

function getCurrentDate(){
    $info = getdate();
    
    $date = $info['mday'];
    $month = $info['mon'];
    $year = $info['year'];
    $hour = $info['hours'];
    $min = $info['minutes'];
    $sec = $info['seconds'];
    
    $current_date = "$year-$month-$date  $hour:$min:$sec";
    return $current_date;
}


$id = 0;
