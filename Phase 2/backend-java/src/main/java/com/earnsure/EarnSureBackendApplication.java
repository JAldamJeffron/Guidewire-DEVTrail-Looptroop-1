package com.earnsure;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

@SpringBootApplication
@EnableScheduling
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Critical to link React UI natively without blockades
public class EarnSureBackendApplication {

    // In-memory Database for hackathon speed 
    private final Map<String, Object> workerDatabase = new HashMap<>();
    private final List<Map<String, Object>> profileHistoryLedger = new ArrayList<>();

    public static void main(String[] args) {
        System.setProperty("server.port", "8080"); 
        SpringApplication.run(EarnSureBackendApplication.class, args);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerWorker(@RequestBody Map<String, Object> data) {
        String workerId = "WK-" + UUID.randomUUID().toString().substring(0,8).toUpperCase();
        workerDatabase.put("workerId", workerId);
        workerDatabase.put("name", data.get("name"));
        workerDatabase.put("platform", data.get("platform"));
        workerDatabase.put("upiId", data.get("upiId"));
        workerDatabase.put("zone", data.get("zone"));
        
        // Task 3 Upgrades: Persisting Gig Analytics
        workerDatabase.put("avgRides", data.getOrDefault("avgRides", 120));
        workerDatabase.put("avgEarnings", data.getOrDefault("avgEarnings", 6500));
        workerDatabase.put("vehicleType", data.getOrDefault("vehicleType", "Two-Wheeler"));
        
        // Task 3 Aggregate Initializers for the Profile Ledger (Pre-Loaded for Demo Purposes)
        workerDatabase.put("totalHoursLost", 18.0);
        workerDatabase.put("totalPayouts", 1700.0);
        workerDatabase.put("policyActive", true);
        
        recordHistory("Worker Profile Synced from " + data.get("platform") + " API. Shield dynamically locked.");
        recordHistory("HISTORICAL LOG: Identified 18 hours unplanned offline routing downtime last month. Cleared ₹1700.0 to UPI framework.");
        
        return ResponseEntity.ok(Map.of("status", "SUCCESS", "worker_id", workerId));
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getHistoryLedgers() {
        return ResponseEntity.ok(Map.of(
            "worker_status", workerDatabase.isEmpty() ? null : workerDatabase,
            "ledger", profileHistoryLedger
        ));
    }

    @PostMapping("/claims/process")
    public ResponseEntity<?> processClaim(@RequestBody Map<String, Object> claimParams) {
        double actualLossPayout = 850.00;
        double daysLost = 1.0;
        
        if (claimParams.containsKey("days_lost")) {
            daysLost = Double.parseDouble(claimParams.get("days_lost").toString());
            actualLossPayout = daysLost * 850.00;
        } 
        actualLossPayout = Math.max(300.00, Math.min(2500.00, actualLossPayout));
        
        String triggerType = claimParams.getOrDefault("trigger_type", "MANUAL_SIMULATOR").toString();
        String activeUpi = workerDatabase.containsKey("upiId") ? workerDatabase.get("upiId").toString() : "UNLINKED-UPI";
        
        // Task 3: Automatically aggregate worker loss logs incrementally
        if(!workerDatabase.isEmpty()) {
            double currentHours = Double.parseDouble(workerDatabase.get("totalHoursLost").toString());
            double currentPayouts = Double.parseDouble(workerDatabase.get("totalPayouts").toString());
            workerDatabase.put("totalHoursLost", currentHours + (daysLost * 9.0)); // 9 hrs block
            workerDatabase.put("totalPayouts", currentPayouts + actualLossPayout);
        }
        
        String logEntry = "🚨 Trigger Executed [" + triggerType + "]. Disbursed: ₹" + actualLossPayout + " instantaneously to UPI: " + activeUpi;
        recordHistory(logEntry);

        return ResponseEntity.ok(Map.of(
            "status", "PAYOUT_INITIATED", 
            "message", "Claim quantified. Transfer mapped to UI ledger.", 
            "payout_amount_inr", actualLossPayout,
            "receipt_id", "UPI-" + UUID.randomUUID().toString()
        ));
    }

    private void recordHistory(String event) {
        Map<String, Object> log = new HashMap<>();
        log.put("date", new Date().toString());
        log.put("event", event);
        profileHistoryLedger.add(log);
    }
}
