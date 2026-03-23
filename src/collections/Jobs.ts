import type { CollectionConfig } from "payload"

const Jobs: CollectionConfig = {
  slug: "jobs",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "department", "openings", "status", "updatedAt"],
    group: "Content",
    listSearchableFields: ["title", "department"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "title",
      label: "Job Title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "department",
      label: "Department",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "openings",
      label: "Number of Openings",
      type: "number",
      required: true,
      min: 1,
      defaultValue: 1,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "icon",
      label: "Icon",
      type: "select",
      required: true,
      defaultValue: "briefcase",
      options: [
        { label: "Ruler (Architect)", value: "ruler" },
        { label: "Hard Hat (Construction)", value: "hardhat" },
        { label: "Droplets (Plumbing)", value: "droplets" },
        { label: "Thermometer (HVAC)", value: "thermometer" },
        { label: "Calculator (Budget)", value: "calculator" },
        { label: "Briefcase (General)", value: "briefcase" },
        { label: "Code (IT)", value: "code" },
        { label: "Users (HR)", value: "users" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "purpose",
      label: "Purpose / Summary",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "duties",
      label: "Key Responsibilities",
      type: "array",
      required: true,
      localized: true,
      fields: [
        {
          name: "duty",
          label: "Responsibility",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "requirements",
      label: "Requirements",
      type: "array",
      required: true,
      localized: true,
      fields: [
        {
          name: "requirement",
          label: "Requirement",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      defaultValue: "open",
      options: [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "sortOrder",
      label: "Sort Order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Lower numbers appear first",
      },
    },
  ],
}

export default Jobs
