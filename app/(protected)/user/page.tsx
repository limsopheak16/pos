import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { PageTableView } from "./page-tableview";
import { staticUsers } from "@/data/static-data";


const UserPage = async ({ searchParams }: { searchParams: Promise<Record<string, string>> }) => {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1");
  
  // Simulate pagination with static data
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedUsers = staticUsers.slice(startIndex, endIndex);

  // Map static users to UserModel interface
  const mappedUsers = paginatedUsers.map(user => ({
    ...user,
    imageUrl: user.imageUrl || undefined // Convert null to undefined
  }));

  const data = {
    pageSize,
    currentPage: page,
    prevPage: page > 1 ? page - 1 : 0,
    nextPage: endIndex < staticUsers.length ? page + 1 : 0,
    totalItems: staticUsers.length,
    totalPages: Math.ceil(staticUsers.length / pageSize),
    records: mappedUsers
  };

  return <PageWrapper>
    <PageTableView title="Users" data={data} />
  </PageWrapper>;
};

export default UserPage;
