package org.example.myproject.services.Impl;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.example.myproject.model.entity.Order;
import org.example.myproject.repositories.OrderRepository;
import org.example.myproject.services.ReportService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.lang.reflect.Array;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportServiceImpl implements ReportService {
    OrderRepository orderRepository;

    boolean checkDateInGivenDate(String date, OffsetDateTime start, OffsetDateTime end) {
        OffsetDateTime currentDate = OffsetDateTime.parse(date);

        boolean isBetweenDate = ((currentDate.isEqual(start) || currentDate.isAfter(start))
                && (currentDate.isEqual(end) || currentDate.isBefore(end)));

        return isBetweenDate;
    }

    @Override
    public void generateExcel(HttpServletResponse response, String startDate, String endDate) throws IOException {
        List<Order> orders = orderRepository.findAll();
        int indexRow = 0;
        ArrayList<String> columns = new ArrayList<>(Arrays.asList("ID", "User", "Email", "Address", "Status", "CreatedAt", "Total"));
        ArrayList<String> start = new ArrayList<>(Arrays.asList( startDate.split("-")));
        ArrayList<String> end = new ArrayList<>(Arrays.asList( endDate.split("-")));


        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Order Information");
        Cell title = sheet.createRow(indexRow++).createCell(0);
        title.setCellValue("Tổng số lượng đơn hàng và doanh thu\n" + start.get(2) + "-" + start.get(1) + "-" + start.get(0) + " - " + end.get(2) + "-" + end.get(1) + "-" + end.get(0));

        CellStyle allBorderStyle = workbook.createCellStyle();
        allBorderStyle.setBorderTop(BorderStyle.THIN);
        allBorderStyle.setBorderBottom(BorderStyle.THIN);
        allBorderStyle.setBorderLeft(BorderStyle.THIN);
        allBorderStyle.setBorderRight(BorderStyle.THIN);

        CellStyle styleTitle = workbook.createCellStyle();
        styleTitle.setAlignment(HorizontalAlignment.CENTER);
        styleTitle.setVerticalAlignment(VerticalAlignment.CENTER);
        styleTitle.setWrapText(true);

        Font font = workbook.createFont();
        font.setBold(true);
        font.setItalic(true);
        font.setFontHeightInPoints((short) 16);

        styleTitle.setBorderTop(BorderStyle.THIN);
        styleTitle.setBorderBottom(BorderStyle.THIN);
        styleTitle.setBorderLeft(BorderStyle.THIN);
        styleTitle.setBorderRight(BorderStyle.THIN);

        styleTitle.setFont(font);
        title.setCellStyle(styleTitle);

        sheet.addMergedRegion(new CellRangeAddress(0, 2, 0, 6));
        indexRow += 2;
        HSSFRow row = sheet.createRow(indexRow);

//        row.createCell(0).setCellValue("ID");
//        row.createCell(1).setCellValue("User");
//        row.createCell(2).setCellValue("Total");
//        row.createCell(3).setCellValue("Status");
//        row.createCell(4).setCellValue("CreatedAt");

        for(int i = 0; i < columns.size(); ++i) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columns.get(i));
            cell.setCellStyle(allBorderStyle);
        }

        // Create cell style for VND currency
        HSSFCellStyle currencyStyle = workbook.createCellStyle();
        HSSFDataFormat dataFormat = workbook.createDataFormat();
//        currencyStyle.setDataFormat(dataFormat.getFormat("$#,##0.00"));
        currencyStyle.setDataFormat(dataFormat.getFormat("#,##0 ₫"));

        currencyStyle.setBorderTop(BorderStyle.THIN);
        currencyStyle.setBorderBottom(BorderStyle.THIN);
        currencyStyle.setBorderLeft(BorderStyle.THIN);
        currencyStyle.setBorderRight(BorderStyle.THIN);

        // Define exchange rate (1 USD = 25,000 VND, example rate)
//        double exchangeRate = 25000.0;
        indexRow++;
        long total = 0L;
        for(int i = 0; i < orders.size(); ++i) {
            int cell = 0;
            if(!checkDateInGivenDate(
                    orders.get(i).getCreatedAt().toString(),
                    OffsetDateTime.of(Integer.parseInt(start.get(0)), Integer.parseInt(start.get(1)), Integer.parseInt(start.get(2)), 0, 0, 0, 0, ZoneOffset.UTC),
                    OffsetDateTime.of(Integer.parseInt(end.get(0)), Integer.parseInt(end.get(1)), Integer.parseInt(end.get(2)), 0, 0, 0, 0, ZoneOffset.UTC)
            )) {
                continue;
            }

            total += orders.get(i).getTotal();

            HSSFRow dataRow = sheet.createRow(indexRow);

            Cell idCell = dataRow.createCell(cell++);
            idCell.setCellStyle(allBorderStyle);
            idCell.setCellValue(orders.get(i).getId());

            Cell fullNameCell = dataRow.createCell(cell++);
            fullNameCell.setCellStyle(allBorderStyle);
            fullNameCell.setCellValue(orders.get(i).getUser().getFullName());

            Cell emailCell = dataRow.createCell(cell++);
            emailCell.setCellStyle(allBorderStyle);
            emailCell.setCellValue(orders.get(i).getUser().getEmail());

            Cell adderssCell = dataRow.createCell(cell++);
            adderssCell.setCellStyle(allBorderStyle);
            adderssCell.setCellValue(orders.get(i).getOrderInfo().getShipTo());


            Cell statusCell = dataRow.createCell(cell++);
            statusCell.setCellStyle(allBorderStyle);
            statusCell.setCellValue(orders.get(i).getStatus());

            Cell createdAtCell = dataRow.createCell(cell++);
            createdAtCell.setCellStyle(allBorderStyle);
            createdAtCell.setCellValue(orders.get(i).getCreatedAt().toString());

            Cell totalCell = dataRow.createCell(cell++);
            double totalInVND = orders.get(i).getTotal();
//            double totalInDollar = totalInVND / exchangeRate;
            totalCell.setCellValue(totalInVND);
            totalCell.setCellStyle(currencyStyle);

            indexRow++;
        }

        sheet.addMergedRegion(new CellRangeAddress(indexRow, indexRow + 1, 5, 5));
        sheet.addMergedRegion(new CellRangeAddress(indexRow, indexRow + 1, 6, 6));
        CellStyle totalStyle = workbook.createCellStyle();

        Font totalFont = workbook.createFont();
        totalFont.setBold(true);
        totalFont.setFontHeightInPoints((short) 14);

        totalStyle.setBorderTop(BorderStyle.THIN);
        totalStyle.setBorderBottom(BorderStyle.THIN);
        totalStyle.setBorderLeft(BorderStyle.THIN);
        totalStyle.setBorderRight(BorderStyle.THIN);

        totalStyle.setFont(totalFont);

        totalStyle.setAlignment(HorizontalAlignment.CENTER);
        totalStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        HSSFRow dataRow = sheet.createRow(indexRow);
        HSSFRow belowRow = sheet.createRow(indexRow + 1);

        Cell titleTotalCell = dataRow.createCell(5);
        Cell totalCell = dataRow.createCell(6);

        Cell belowRowCell = belowRow.createCell(5);
        Cell belowRowCellNext = belowRow.createCell(6);

        belowRowCell.setCellStyle(totalStyle);
        belowRowCellNext.setCellStyle(totalStyle);

        titleTotalCell.setCellStyle(totalStyle);
        titleTotalCell.setCellValue("Total");

        currencyStyle.setAlignment(HorizontalAlignment.CENTER);
        currencyStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        totalCell.setCellStyle(currencyStyle);
        totalCell.setCellValue(total);

        int numColumn = sheet.getRow(3).getPhysicalNumberOfCells();
        // Auto-size columns based on content
        for (int i = 0; i < sheet.getRow(3).getPhysicalNumberOfCells(); i++) {
            sheet.autoSizeColumn(i);
        }

        ServletOutputStream ops = response.getOutputStream();
        workbook.write(ops);
        workbook.close();
    }
}
