import React from "react";
import { TableInsight } from "../types";

interface Props {
  tables: TableInsight[];
}

const TableOrders: React.FC<Props> = ({ tables }) => {
  return (
    <div className="mt-4 space-y-4">
      {tables.map((table, idx) => (
        <div key={idx} className="p-4 border rounded-lg shadow">
          <h3 className="font-semibold text-lg">{table.name} - Party of {table.party_size}</h3>
          <p>Prep Time: {table.prep_time} min</p>
          <p>Complexity: {table.complexity}/5</p>

          {Object.keys(table.dietary_requirements).length > 0 && (
            <div className="mt-2 text-red-600">
              <strong>⚠️ Dietary:</strong>
              <ul>
                {Object.entries(table.dietary_requirements).map(([key, val]) => (
                  <li key={key}>- {key}: {val}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-2">
            <strong>Orders:</strong>
            <ul className="list-disc list-inside">
              {table.orders.map((order, i) => (
                <li key={i}>
                  {order.item} — ${order.price}
                  {order.dietary_tags.length > 0 && (
                    <span className="text-sm text-red-500"> ({order.dietary_tags.join(", ")})</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {table.kitchen_notes.length > 0 && (
            <p className="mt-2 text-yellow-600">🔥 Notes: {table.kitchen_notes.join(", ")}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TableOrders;
