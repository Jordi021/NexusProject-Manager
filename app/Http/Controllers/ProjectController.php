<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Inertia\Inertia;
use App\Models\Contract;
use App\Models\ProjectContract;
use App\Models\Customer;
use App\Models\Analyst;
use App\Models\User;


class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();
        $projectsApproved = $this->getApprovedContractProyects();
        $allAnalysts = Analyst::getAnalystsAndUserNames();
        $userswithoutRole = User::withoutRoles();
        return Inertia::render('Project', [
            "projects" => $projects,
            "projectsApproved" => $projectsApproved,
            "allAnalysts" => $allAnalysts,
            "userswithoutRole" => $userswithoutRole,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'progress' => 'required|integer',
            'status' => 'required|in:Iniciado,En Desarrollo,Cancelado,Finalizado',
            'contract_id' => 'required|exists:contracts,id',
        ]);

        Project::create($request->all());

        return to_route('projects.index');
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'progress' => 'required|integer|between:0,100',
            'status' => 'required|in:Iniciado,En Desarrollo,Cancelado,Finalizado',
            'contract_id' => 'required|exists:contracts,id',
        ]);

        $project = Project::findOrFail($id);
        $project->update($validatedData);

        return redirect()->route('projects.index');
    }

    public function storeAnalyst(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:users,id',
        ]);

        $id = $request->input('id');

        User::assignRoleAnalystById($id);
        Analyst::syncWithUsers();

        return to_route('projects.index');
    }

    public function destroy($id)
    {
        Project::findOrFail($id)->delete();

        return redirect()->route('projects.index');
    }

    private function getApprovedContractProyects()
    {
        $approvedContractsIds = Contract::pluck('project_contract_id')->toArray();
        $contractId = Contract::pluck("id")->toArray();

        $projectContracts = ProjectContract::whereIn('id', $approvedContractsIds)->select("id", 'problem', 'customer_id')->get();

        $results = [];
        for ($i = 0; $i < count($projectContracts); $i++) {
            $contract = $projectContracts[$i];
            $customer = Customer::find($contract->customer_id);
            $id = $contractId[$i];
            if ($customer) {
                $results[] = [
                    "id" => $id,
                    'customer_name' => $customer->name,
                    'problem' => $contract->problem,
                ];
            }
        }

        return $results;
    }
}
