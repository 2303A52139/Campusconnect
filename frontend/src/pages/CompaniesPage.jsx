import { useEffect, useState } from "react";

import {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
} from "../services/adminService";

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [companyName, setCompanyName] =
    useState("");

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    const res = await getCompanies();

    setCompanies(res.data);
  };

  const handleAdd = async () => {
    if (!companyName) return;

    try {
      await addCompany({
        name: companyName,
      });

      setCompanyName("");

      loadCompanies();
    } catch (error) {
      alert(
        error.response?.data?.message
      );
    }
  };

  const handleUpdate = async (
    id,
    oldName
  ) => {
    const newName = prompt(
      "Enter new company name",
      oldName
    );

    if (!newName) return;

    try {
      await updateCompany(id, {
        name: newName,
      });

      loadCompanies();
    } catch (error) {
      alert(
        error.response?.data?.message
      );
    }
  };

  const handleDelete = async (id) => {
    await deleteCompany(id);

    loadCompanies();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Company Management</h1>

      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) =>
          setCompanyName(
            e.target.value
          )
        }
      />

      <button onClick={handleAdd}>
        Add Company
      </button>

      <table
        border="1"
        cellPadding="10"
        style={{
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td>{company.name}</td>

              <td>
                <button
                  onClick={() =>
                    handleUpdate(
                      company._id,
                      company.name
                    )
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      company._id
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompaniesPage;