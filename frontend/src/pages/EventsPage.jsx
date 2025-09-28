import Header from "../components/Layout/Header";
import EventCard from "../components/Events/EventCard";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";
import { useEffect } from "react";
import Footer from "../components/Route/Footer";
function EventsPage() {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header activeHeading={4} />

          {allEvents && allEvents.length > 0 ? (
            <EventCard active={true} data={allEvents[0]} />
          ) : (
            <div className="w-full flex items-center justify-center py-10 px-4">
              <div className="bg-white shadow rounded-xl p-6 w-[320px] text-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                  alt="No Events"
                  className="w-24 h-24 mx-auto mb-4 opacity-60"
                />
                <h2 className="text-lg font-semibold text-gray-700 mb-1">
                  No Events Available
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  There are currently no events to show. Please check back
                  later.
                </p>
              </div>
            </div>
          )}

          <Footer />
        </>
      )}
    </div>
  );
}

export default EventsPage;
