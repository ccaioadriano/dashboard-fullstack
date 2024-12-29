<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Google\Client as GoogleClient;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!$token = auth()->attempt($credentials)) {
            return response(['message' => 'Invalid Credentials.'], 401);
        }
        return response(['user' => auth()->user(), 'token' => $token]);
    }

    public function socialLogin(Request $request)
    {
        $tokenGoogle = $request->input('token');

        // Validar o token com a API do Google
        $client = new GoogleClient(['client_id' => env('GOOGLE_CLIENT_ID')]);

        // Ignorar verificação de SSL (apenas para testes locais)
        $httpClient = new \GuzzleHttp\Client(['verify' => false]);
        $client->setHttpClient($httpClient);

        $payload = $client->verifyIdToken($tokenGoogle);

        if (!$payload) {
            \Log::error('Invalid Google token.');
            return response()->json(['error' => 'Token inválido'], 401);
        }

        // Obter informações do usuário
        $email = $payload['email'];
        $name = $payload['name'];

        // Buscar ou criar o usuário no banco
        $user = User::firstOrCreate(['email' => $email], ['name' => $name, 'password' => bcrypt(uniqid())]);

        if (!$user->exists()) {
            \Log::error('User creation failed.');
            return response(['message' => 'Invalid Credentials.'], 401);
        }

        $tokenToUser = JWTAuth::fromUser($user);

        return response()->json(['token' => $tokenToUser, 'user' => $user]);
    }

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = JWTAuth::fromUser($user);

        return response(['user' => $user, 'token' => $token]);
    }

    public function logout(Request $request)
    {
        auth()->logout();
        return response('', 204);
    }
}
