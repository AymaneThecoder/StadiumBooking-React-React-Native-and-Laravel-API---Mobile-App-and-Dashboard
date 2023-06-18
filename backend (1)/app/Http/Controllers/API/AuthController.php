<?php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;
use Validator;
use App\Models\User;

class AuthController extends Controller
{
    // public function Allusers(){
    //     $users = User::all();
    //     return response()->json(['data' => $users]);
    // }

    public function Allusers(){
        $users = User::where('role_as', '!=', 1)->get();
        return response()->json(['data' => $users]);
    }


    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully!']);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone_number' => 'required|integer|unique:users',
            'password' => 'required|string|min:8'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }
        $existingUser = User::where('phone_number', $request->phone_number)->first();

        if ($existingUser) {
            return response()->json(['message' => 'Phone number already taken'], 422);}
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password)
         ]);

        return response()->json(['message' => 'User created successfully!', 'user' => $user]);
    }

    public function updateuser(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email,' . $user->id,
            'phone_number' => 'integer|unique:users,phone_number,' . $user->id,
            'password' => 'string|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user->name = $request->input('name', $user->name);
        $user->email = $request->input('email', $user->email);
        $phone_number = $request->input('phone_number');
        $user->password = Hash::make($request->input('password', $user->password));
        $user->save();

        return response()->json(['message' => 'User updated successfully!', 'user' => $user]);
    }

    public function showuser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone_number' => 'required|integer|unique:users',
            'password' => 'required|string|min:8'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password)
         ]);
        $token = $user->createToken($user->email.'auth_token')->plainTextToken;

        return response()
            ->json([
                'username' => $user->name,
                'token' => $token,
                'token_type' => 'Bearer',
                'status' => 200,
                'message'=>'Registered Successfully'

            ]);
    }




    public function login(Request $request)
{
    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'Provided email or password is incorrect', 'status'=> 422]);
    }

    $user = User::where('email', $request->input('email'))->firstOrFail();

    if ($user->role_as == 1) {
        $role = 'admin';
        $token = $user->createToken($user->name . '_AdminToken', ['server:admin'])->plainTextToken;
    } else {
        $role = 'user';
        $token = $user->createToken($user->name . '_Token', [''])->plainTextToken;
    }

    return response()->json([
        'username' => $user->name,
        'token' => $token,
        'status' => 200,
        'message' => 'Logged in successfully',
        'role' => $role
    ]);
}


    // method for user logout and delete token
    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'status' => 200,
            'message' => 'successfully logged out'

        ];
    }
}
