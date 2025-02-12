<?php


function emptyInputSignup($Fname, $Lname, $mail, $Uname, $Pword){
    
    if(empty($Fname) || empty($Lname) || empty($mail) ||  empty($Uname) ||  empty($Pword)){

        $result = true;
    }
    else{
        $result = false;
    }
    return $result;
}

function invalidUid($Uname){
    if(!preg_match("/^[a-zA-Z0-9]*$/", $Uname)){

        $result = true;
    }
    else{
        $result = false;
    }
    return $result;
}

function invalidEmail($mail){
    if(!filter_var($mail, FILTER_VALIDATE_EMAIL)){

        $result = true;
    }
    else{
        $result = false;
    }
    return $result;
}

function userExist($conn, $Uname, $mail){
    $sql = "SELECT * FROM employees WHERE username = ? OR email = ?;";
    $stmt = $conn->prepare($sql);
    if(!$stmt){
        header("location: ../signup.php?error=usernametaken");
        exit();
    }

    $stmt->execute([$Uname, $mail]);

    $resultData = $stmt->fetch(PDO::FETCH_ASSOC);

    if($resultData){
        return $resultData;
    }else {
        $result = false;
        return  $result;
    }
}

function createUser($conn, $userid, $Fname, $Lname, $mail, $Uname, $Pword, $rank ){
    $sql = "INSERT INTO employees (userid, firstname, lastname, email, username, password, rank) VALUES (?, ?, ?, ?, ?, ?, ?);";
    $stmt = $conn->prepare($sql);
    if(!$stmt){
        header("location: ../signup.php?error=usernametaken");
        exit();
    }
    $hashed_password = password_hash($Pword, PASSWORD_DEFAULT);

    $stmt->execute([$userid, $Fname, $Lname, $mail, $Uname, $hashed_password, $rank]);

    header("location: ../signup.php?error=none");
    exit();
}
