package org.example.myproject.services;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface ReportService {
    public void generateExcel(HttpServletResponse response, String startDate, String endDate) throws IOException;
}
