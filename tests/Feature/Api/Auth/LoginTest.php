<?php

use App\Models\User;

use function Pest\Laravel\postJson;



describe("login", function () {
    test("Can authenticate", function () {
        $data = User::factory()->create();
        postJson("api/login", [
            "email" => $data->email,
            "password" => "password"
        ])->assertJsonStructure(["user", "token"])
            ->assertOk();
    });


    test("Can't authenticate", function () {
        postJson("api/login", [
            "email" => "teste@gmail.com",
            "password" => "password"
        ])->assertJsonStructure(["message"], ["message" => "Invalid Credentials."])
            ->assertStatus(401);
    });
});

describe("register", function () {
    test("Can create user", function () {
        $data = User::factory()->create();
        postJson("api/register", [
            "email" => $data->email,
            "password" => "password"
        ])->assertJsonStructure(["user", "token"])
            ->assertOk();
    });
});


