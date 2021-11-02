import axios from 'axios';
import React, { useState, useEffect } from 'react'
import DataTable from "react-data-table-component";
import { hostUrl } from '../../Components/Host';
function TopVetTable() {
    const [vetRatings, setvetRatings] = useState([]);

    useEffect(() => {
        axios.get(`${hostUrl}/vetRatings/admin`).then((response) => {
            setvetRatings(response.data);
        });
        console.log(vetRatings);
    }, []);
    const columnsRatings = [
        {
            name: "Vet Name",
            selector: "vet_name",
            sortable: true,
        },
        {
            name: "Ratings",
            selector: "averageRatings",
            sortable: true,
            right: true,
        },
    ];

    return (
        <div>
            <DataTable
                style={{ textAlign: 'left' }}
                title="Top Vet in Ratings"
                pagination={true}
                paginationPerPage={3}
                paginationRowsPerPageOptions={[5, 10, 20]}
                columns={columnsRatings}
                data={vetRatings}
                responsive={true}

            />
        </div>
    )
}

export default TopVetTable
