"use strict";

//Class where I described user and in this class I wanna validate data from client to be sure in correctness
class User {
  username: string;
  email: string;
  password: string;
  name: string;
  bio: string;
  profilePicture: string;

  constructor(
    username: string,
    email: string,
    password: string,
    name: string,
    bio: string,
    profilePicture: string
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.name = name;
    this.bio = bio;
    this.profilePicture = profilePicture;
  }

  
}