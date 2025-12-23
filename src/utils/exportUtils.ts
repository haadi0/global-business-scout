import * as XLSX from "xlsx";
import { BusinessData } from "@/types/business";

export const exportToExcel = (data: BusinessData[], filename: string, fullExport: boolean = true) => {
  const exportData = data.map((item) => {
    if (fullExport) {
      return {
        "Business Name": item.name,
        "Email": item.email,
        "Phone": item.phone,
        "Website": item.website,
        "Address": item.address,
        "Category": item.category,
        "Facebook": item.socialMedia.facebook || "",
        "Instagram": item.socialMedia.instagram || "",
        "Twitter": item.socialMedia.twitter || "",
        "LinkedIn": item.socialMedia.linkedin || "",
        "Rating": item.rating || "",
        "Reviews": item.reviews || "",
      };
    } else {
      return {
        "Business Name": item.name,
        "Email": item.email,
        "Description": item.category,
        "Website": item.website,
      };
    }
  });

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Business Data");

  // Auto-size columns
  const maxWidth = 50;
  const colWidths = Object.keys(exportData[0] || {}).map((key) => ({
    wch: Math.min(
      maxWidth,
      Math.max(
        key.length,
        ...exportData.map((row) => String(row[key as keyof typeof row]).length)
      )
    ),
  }));
  worksheet["!cols"] = colWidths;

  XLSX.writeFile(workbook, `${filename}.xlsx`);
};
