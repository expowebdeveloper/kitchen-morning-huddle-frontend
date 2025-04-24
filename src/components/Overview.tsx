import React from "react";
import { DietaryRequirements } from "../types";

interface Props {
  date: string;
  totalReservations: number;
  totalGuests: number;
  totalOrders: number;
  highComplexityOrders: number;
  dietaryRequirements: DietaryRequirements;
}

const Overview: React.FC<Props> = ({
  date,
  totalReservations,
  totalGuests,
  totalOrders,
  highComplexityOrders,
  dietaryRequirements,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Kitchen Huddle - {date}</h2>
      <p>📅 Reservations: {totalReservations}</p>
      <p>👥 Guests: {totalGuests}</p>
      <p>🍽️ Orders: {totalOrders}</p>
      <p>🔥 High Complexity Orders: {highComplexityOrders}</p>
      <div className="mt-2">
        <strong>⚠️ Dietary Requirements:</strong>
        <ul>
          {Object.entries(dietaryRequirements).map(([key, value]) => (
            <li key={key}>- {key}: {value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Overview;
