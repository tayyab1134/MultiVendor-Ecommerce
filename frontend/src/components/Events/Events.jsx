import React from "react";
import EventCard from "./EventCard";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid place-items-center">
            {allEvents && allEvents.length > 0 ? (
              <EventCard data={allEvents[0]} />
            ) : (
              <div className="bg-white shadow rounded-xl p-6 w-[320px] text-center mt-6">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                  alt="No Events"
                  className="w-24 h-24 mx-auto mb-4 opacity-60"
                />
                <h2 className="text-lg font-semibold text-gray-700 mb-1">
                  No Events Found
                </h2>
                <p className="text-sm text-gray-500">
                  Currently there are no events to display.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Events;
