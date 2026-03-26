import { Customer } from "@/models/Customer";
import { Metadata } from "next";

export async function generateMetadata(props: CustomerDetailsProps): Promise<Metadata> {

  const id = (await props.params).id;
  const url = `${process.env.BASE_URL}/customers/${id}`;
  const response = await fetch(url, { method: "GET" });
  const customer = (await response.json()) as Customer;

  return {
    title: `Awesome App: ${customer.name}`,
    description: "Listing of customers",
    keywords: ["global customers", "tech companies", "fortune 500"],
  };
}

type CustomerDetailsProps = {
  params: Promise<{ id: number }>;
};

export default async function CustomerDetails(props: CustomerDetailsProps) {

 console.log("rendering customer details...");
  const id = (await props.params).id;
  const url = `${process.env.BASE_URL}/customers/${id}`;
  const response = await fetch(url, { method: "GET" });
  const customer = (await response.json()) as Customer;

  return (
    <div>
      <h4>Customer Details</h4>

      <div>
        <p>Id: {customer.id}</p>
        <p>Name: {customer.name}</p>
        <p>Location: {customer.location}</p>
      </div>
    </div>
  );
}
