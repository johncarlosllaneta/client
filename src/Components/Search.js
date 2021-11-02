import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormControl, Container } from "react-bootstrap";
const Search = () => {
  return (
    <>
      <Container>
        <Form inline style={{ justifyContent: "flex-end" }}>
          <FormControl type="text" placeholder="Search" className="mr-3" />
          {/* <Button variant="outline-info" className="mr-1">
            Search
          </Button> */}
        </Form>
      </Container>
    </>
  );
};

export default Search;
