import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { PageTableView } from "./listcustomer";
import { staticCustomers } from "@/data/static-data";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const CustomerPage = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1");
  
  // Simulate pagination with static data
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCustomers = staticCustomers.slice(startIndex, endIndex);

  const data = {
    pageSize,
    currentPage: page,
    prevPage: page > 1 ? page - 1 : 0,
    nextPage: endIndex < staticCustomers.length ? page + 1 : 0,
    totalItems: staticCustomers.length,
    totalPages: Math.ceil(staticCustomers.length / pageSize),
    records: paginatedCustomers.map(customer => ({
      id: parseInt(customer.id.replace('CUST', '')),
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address
    }))
  };

  return <PageWrapper>
    <PageTableView title="Customers" data={data} />
  </PageWrapper>;
};

export default CustomerPage;

