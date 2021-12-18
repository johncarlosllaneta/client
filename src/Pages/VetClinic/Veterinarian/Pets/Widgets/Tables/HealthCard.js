import React from "react";
import MaterialTable from "material-table";
import { Popover } from "react-bootstrap";
function HealthCard() {
  const columns = [
    {
      title: "Service Name",
      field: "service_name",
      defaultSort: "asc",
    },
    {
      title: "Service Description",
      field: "service_description",
      sorting: true,
    },
    {
      title: "Vet name",
      field: "vet_name",
      sorting: true,
    },
    {
      title: "Category",
      field: "category",
      sorting: true,
    },
    {
      title: "Date and Time",
      // field: "date_accomplished",
      sorting: true,
      //   render: (row) =>
      //     dateConvertion(row.date_accomplished.toString().split("T")[0]) +
      //     " " +
      //     timeFormatter(
      //       row.date_accomplished
      //         .substring()
      //         .split("T")[1]
      //         .substring(
      //           0,
      //           row.date_accomplished.substring().split("T")[1].length - 5
      //         )
      //     ),
    },

    // {
    //   title: "Action",
    //   render: (row) => (
    //     <div>
    //       <OverlayTrigger
    //         placement="top-start"
    //         delay={{ show: 250 }}
    //         overlay={renderTooltip({ msg: "View Information" })}
    //       >
    //         <Button
    //           variant="info"
    //           className="mr-3"
    //           onClick={() => {
    //             alert("hi");
    //           }}
    //         >
    //           <AiOutlineSearch style={{ fontSize: 25 }} />
    //         </Button>
    //       </OverlayTrigger>

    //       <OverlayTrigger
    //         placement="top-start"
    //         delay={{ show: 250 }}
    //         overlay={renderTooltip({ msg: "Edit Details" })}
    //       >
    //         <Button variant="primary" className="mr-3" onClick={() => {}}>
    //           <FaRegEdit style={{ fontSize: 25 }} />
    //         </Button>
    //       </OverlayTrigger>

    //       <OverlayTrigger
    //         placement="top-start"
    //         delay={{ show: 250 }}
    //         overlay={renderTooltip({ msg: "Delete Details" })}
    //       >
    //         <Button variant="danger" onClick={() => {}}>
    //           <AiOutlineDelete style={{ fontSize: 25 }} />
    //         </Button>
    //       </OverlayTrigger>
    //     </div>
    //   ),
    // },
  ];
  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  return (
    <div>
      <MaterialTable
        title={"Health Record"}
        columns={columns}
        // data={healthCard}
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

export default HealthCard;
