import React from "react";
import { Popover } from "react-bootstrap";
import MaterialTable from "material-table";
function Appointment() {
  const columns = [
    {
      title: "Vaccine Name",
      field: "vaccine_name",
      defaultSort: "asc",
      render: (row) => <p>{row.vaccine_name}</p>,
    },
    {
      title: "Againts",
      field: "againts",
      sorting: true,
    },
    {
      title: "Vaccine Number",
      field: "vaccine_number",
      sorting: true,
    },

    {
      title: "Manufacturer",
      field: "manufacturer",
      sorting: true,
    },
    {
      title: "Weight",
      field: "pet_weight",
      sorting: true,
    },
    {
      title: "Vaccination Date",
      sorting: true,
      // field: "date",
      // render: (row) => dateConvertion(row.date.substring().split("T")[0]),
    },
    {
      title: "Vaccination Time",
      sorting: true,
      // field: "date",
      // render: (row) =>
      //     timeFormatter(
      //         row.date
      //             .substring()
      //             .split("T")[1]
      //             .substring(0, row.date.substring().split("T")[1].length - 5)
      //     ),
    },
  ];

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;
  return (
    <div>
      <MaterialTable
        columns={columns}
        // data={vaccine}
        title={"Appointment Record"}
        cellEditable={false}
        options={{
          sorting: true,
          search: true,
          pageSize: 10,
          pageSizeOptions: [10],
        }}
        style={{
          borderColor: "white",
        }}
      />
    </div>
  );
}

export default Appointment;
