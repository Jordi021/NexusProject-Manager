<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    public function index(): Response {
        return Inertia::render("Comment", [
            "comments" => Comment::with("user:id,name")->latest()->get(),
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            "content" => "required|string|max:255",
        ]);

        $request->user()->comments()->create($validated);
        
        return to_route("comment.index");
    }
}
