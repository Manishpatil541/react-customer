// import RecentlyModifiedCustomers from "../../customer/RecentlyModifiedCustomers";
// import CustomerBubbleMap from "../../customer/CustomerBubbleMap";
// import StageCount from "../../project/StageCountGraph";
// import UpcomingEvents from "../../event/Widget/UpcomingEvents";

function Home(props) {
  return (
    <div className="container-fluid my-5 mx-2">
      <div className="row mb-4">
        <div className="col-md-4">
        
          {/* <RecentlyModifiedCustomers /> */}
        </div>
        <div className="col-md-4 d-flex">
          {/* <UpcomingEvents /> */}
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6 card d-flex">
          <div className="card-title pt-4">
            Customers & Projects By Countries
          </div>
          {/* <CustomerBubbleMap /> */}
        </div>
        <div className="col-md-6 d-flex align-middle">
          {/* <StageCount /> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
