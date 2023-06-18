<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Stade;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class StadeController extends Controller
{
    public function index()
    {
        return Stade::select('id', 'title', 'description','price', 'image', 'size', 'city', 'sport', 'type', 'status', 'featured', 'reviews')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'required|image',
            'price' => 'required|numeric',

            'size' => 'required',
            'type' => 'required',
            'city' => 'required',
            'sport' => 'required',
            'status' => 'required',
            'featured' => 'required|boolean',
            'reviews' => 'required|integer',
        ]);

        $imageName = Str::random() . '.' . $request->image->getClientOriginalExtension();

        try {
            $product = Stade::create($request->post() + ['image' => $imageName]);
            Storage::disk('public')->putFileAs('stades/image', $request->image, $imageName);

            return response()->json(['message' => 'Stade added successfully','status' => 201], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Stade could not be added'], 500);
        }
    }

    public function show($id)
    {
        $stade = Stade::find($id);
        if (!$stade) {
            return response()->json([
                'error' => 'The stade does not exist'
            ], 404);
        }
        return response()->json([
            'Stade' => $stade
        ]);
    }

    public function update(Request $request, Stade $stade)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'nullable|image',
            'price' => 'required|numeric',

            'size' => 'required',
            'type' => 'required',
            'city' => 'required',
            'sport' => 'required',
            'status' => 'required',
            'featured' => 'required|boolean',
            'reviews' => 'required|integer',
        ]);

        $stade->fill($request->post())->update();

        if ($request->hasFile('image')) {
            if ($stade->image) {
                $exist = Storage::disk('public')->exists("stades/image/{$stade->image}");
                if ($exist) {
                    Storage::disk('public')->delete("stades/image/{$stade->image}");
                }
            }

            $imageName = Str::random() . '.' . $request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('stades/image', $request->image, $imageName);
            $stade->image = $imageName;
            $stade->save();
        }

        return response()->json([
            'message' => 'Stade updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $stade = Stade::find($id);

        if (!$stade) {
            return response()->json(['error' => 'The stade does not exist'], 404);
        }

        try {
            $stade->delete();
            return response()->json(['message' => 'Stade deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Stade could not be deleted'], 500);
        }
    }
    public function getTotalStade()
    {
        $totalstade = Stade::count();

        return response()->json([
            'total_stade' => $totalstade
        ]);
    }
}
