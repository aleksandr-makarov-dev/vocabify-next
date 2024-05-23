import Header from "@/components/common/Header";

export default function Home() {
  return (
    <div className="space-y-5">
      <Header title="What is Vocabify?" />
      <p>
        A language learing project built using ASP.NET Web API, EntityFramework
        and Identity, React, SQLite and hosted using Docker.
      </p>
      <div>
        <h5 className="text-lg font-medium mb-1.5">Features</h5>
        <ul className="pl-3 list-disc list-inside">
          <li>HTML file parsing</li>
          <li>Test generation</li>
          <li>Store data in the database</li>
          <li>Users and google signing</li>
        </ul>
      </div>
    </div>
  );
}
