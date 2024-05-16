<?php

namespace App\Http\Controllers;

use App\Models\ProjectContract;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Contract;
use App\Models\ArchivedContract;
use App\Models\Customer;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

use function Pest\Laravel\getConnection;

class ProjectContractController extends Controller
{
    public function index()
    {
        $projectsContracts = $this->getProjectsContracts();
        $contratos = $this->getApprovedContracts();
        $contratosArchivados = $this->getArchivedContracts();
        $clientes = Customer::all();

        return Inertia::render('ProjectReview', [
            "projectsContracts" => $projectsContracts,
            "contratos" => $contratos,
            "contratosArchivados" => $contratosArchivados,
            "clientes" => $clientes,
        ]);
    }

    private function getProjectsContracts()
    {
        return ProjectContract::where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();
        // return ProjectContract::where('status', 'pending')->get();
    }


    private function getApprovedContracts(): array
    {
        $projectContractIds = Contract::pluck('project_contract_id')->toArray();

        $projectContracts = ProjectContract::whereIn('id', $projectContractIds)->get()->toArray();

        return $projectContracts;
    }

    private function getArchivedContracts(): array
    {
        $archivedContractIds = ArchivedContract::pluck('project_contract_id')->toArray();

        $archivedContracts = ProjectContract::whereIn('id', $archivedContractIds)->get()->toArray();

        return $archivedContracts;
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'problem' => 'required|string',
            'requirements' => 'required|string',
            'status' => 'required|in:approved,rejected,pending',
        ]);

        $projectContract = new ProjectContract();
        $projectContract->customer_id = $request->customer_id;
        $projectContract->problem = $request->problem;
        $projectContract->requirements = $request->requirements;
        $projectContract->status = $request->status;
        $projectContract->save();

        return to_route('projects-contracts.index');
    }

    public function destroy($id)
    {
        ProjectContract::findOrFail($id)->delete();
        return to_route('projects-contracts.index');
    }


    public function handleApprove($id)
    {
        $projectContract = ProjectContract::findOrFail($id);
        $projectContract->status = 'approved';
        $projectContract->save();


        $contract = new Contract();
        $contract->project_contract_id = $projectContract->id;
        $contract->save();

        return to_route('projects-contracts.index');
    }

    public function handleArchive($id)
    {
        $projectContract = ProjectContract::findOrFail($id);
        $projectContract->status = 'rejected';
        $projectContract->save();

        $archivedContract = new ArchivedContract();
        $archivedContract->project_contract_id = $projectContract->id;
        $archivedContract->save();


        //$projectContract->delete();

        return to_route('projects-contracts.index');
    }
}
