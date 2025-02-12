<?php
if(isset($_POST['submit']))
{
    
  

    //save to database
    $Fname = $_POST['Fname'];
    $Lname= $_POST['Lname'];
    $mail = $_POST['mail'];
    $Uname = $_POST['Uname'];
    $Pword =  $_POST['Pword'];
    $rank = "user";


     //generate unique user id
     $userid = create_userid();

    //including db connnection

    require_once "dbh.conn.php";
    require_once "function.inc.php";

     if(emptyInputSignup($Fname, $Lname, $mail, $Uname, $Pword) !== false){
        header("location: ../signup.php?error=emptyinputs");
        exit();


     }

     if(invalidUid($Uname) !== false){
        header("location: ../signup.php?error=invalidusername");
        exit();
     }

     if(invalidEmail($mail) !== false){
        header("location: ../signup.php?error=invalidemail");
        exit();
     }

     //check if user already exits

     if(userExist($conn, $Uname, $mail) !== false){
        header("location: ../signup.php?error=usernameTaken");
        exit();
     }

    
    
    

    createUser($conn, $userid, $Fname, $Lname, $mail, $Uname, $Pword, $rank );

   

}
else{
    header("location: ../form.php");
    exit();
}
