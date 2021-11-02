import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import {
  Popover,
  Button,
  Card,
  OverlayTrigger,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import DataTable from "react-data-table-component";

function PostTable() {
  const [post, setPosts] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  const [q, setq] = useState("");
  // alert(swidth);

  function search(rows) {
    const columns = rows[0] && Object.keys(rows[0]);

    return rows.filter((row) =>
      columns.some(
        (column) => row[column].toString().toLowerCase().indexOf(q) > -1
      )
    );
  }

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  var data = [
    {
      key: 1,
      pet_owner_name: "Richard Sasis",
      post_description: "Hello World",
      like_count: 33,
      date: "March 25,2021",
      time: "07:00 PM",
    },
    {
      key: 2,
      pet_owner_name: "Carmella Joy Guelas",
      post_description: "Hello World",
      like_count: 25,
      date: "June 25,2020",
      time: "12:00 PM",
    },
    {
      key: 3,
      pet_owner_name: "Arol Magtalas",
      post_description: "Hello World",
      like_count: 46,
      date: "September 25,2020",
      time: "03:00 AM",
    },
    {
      key: 4,
      pet_owner_name: "Juvy Penazo",
      post_description: "Hello World",
      like_count: 97,
      date: "December 25,2019",
      time: "09:00 AM",
    },
    {
      key: 5,
      pet_owner_name: "Aira Joy Mateo",
      post_description: "Hello World",
      like_count: 62,
      date: "January 25,2019",
      time: "04:23 PM",
    },
    {
      key: 6,
      pet_owner_name: "Jimuel Mercado",
      post_description: "Hello World",
      like_count: 60,
      date: "March 25,2021",
      time: "07:00 PM",
    },
    {
      key: 7,
      pet_owner_name: "Jhaycee Mercado",
      post_description: "Hello World",
      like_count: 12,
      date: "March 25,2021",
      time: "07:00 PM",
    },
    {
      key: 8,
      pet_owner_name: "Jhaycee Llaneta",
      post_description: "Hello World",
      like_count: 30,
      date: "March 25,2021",
      time: "07:00 PM",
    },
    {
      key: 9,
      pet_owner_name: "Jimuel Mercado",
      post_description: "Hello World",
      like_count: 5,
      date: "March 25,2021",
      time: "07:00 PM",
    },
    {
      key: 10,
      pet_owner_name: "Jimuel Mercado",
      post_description: "Hello World",
      like_count: 13,
      date: "March 25,2021",
      time: "07:00 PM",
    },
  ];

  const columns = [
    {
      name: "Name",
      selector: "pet_owner_name",
      sortable: true,
    },
    {
      name: "Post",
      selector: "post_description",
      sortable: true,
    },
    {
      name: "Like Count",
      selector: "like_count",
      sortable: true,
    },
    {
      name: "Date Created",
      selector: "date",
      sortable: true,
    },
    {
      name: "Time Created",
      selector: "time",
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "View Details" })}
          >
            <Button variant="info" className="mr-3" onClick={() => {}}>
              <AiOutlineSearch style={{ fontSize: 25 }} /> View Post
            </Button>
          </OverlayTrigger>
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <div>
      {/* Data Table */}
      <Row className="mt-1 ">
        <Col>
          <Card>
            <Card
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <Card.Body>
                <DataTable
                  actions={
                    <Form.Group>
                      <Form.Control
                        type="text"
                        value={q}
                        placeholder={"Search"}
                        onChange={(e) => setq(e.target.value)}
                      />{" "}
                    </Form.Group>
                  }
                  title={"Post"}
                  pagination
                  paginationRowsPerPageOptions={[5, 10, 20]}
                  paginationPerPage={5}
                  columns={columns}
                  data={search(data)}
                  responsive={true}
                  defaultSortField="vet_name"
                />
              </Card.Body>
            </Card>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PostTable;
