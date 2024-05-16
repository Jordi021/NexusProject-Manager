<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::orderBy('created_at', 'desc')->get();
        return Inertia::render('Customer', [
            "customers" => $customers,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:customers|max:255',
        ]);

        Customer::create($request->all());

        return to_route('customers.index');
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:customers,email,' . $id,
        ]);

        Customer::findOrFail($id)->update($request->all());

        return to_route('customers.index');
    }


    public function destroy($id)
    {
        Customer::findOrFail($id)->delete();
        return to_route('customers.index');
    }
}
