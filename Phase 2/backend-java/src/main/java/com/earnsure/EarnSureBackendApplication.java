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

    // In-memory Database for hackathon speed (No JPA/H2 config required to run Instantly)
    private final Map<String, Object> workerDatabase = new HashMap<>();
    private final List<Map<String, Object>> profileHistoryLedger = new ArrayList<>();

    public static void main(String[] args) {
        System.setProperty("server.port", "8080"); // Force running on 8080
        SpringApplication.run(EarnSureBackendApplication.class, args);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerWorker(@RequestBody Map<String, String> data) {
        String workerId = "WK-" + UUID.randomUUID().toString().substring(0,8).toUpperCase();
        workerDatabase.put("workerId", workerId);
        workerDatabase.put("name", data.get("name"));
        workerDatabase.put("platform", data.get("platform"));
        workerDatabase.put("upiId", data.get("upiId"));
        workerDatabase.put("zone", data.get("zone"));
        workerDatabase.put("policyActive", true);
        
        recordHistory("Registered Worker. Profile active on " + data.get("platform") + ". Premium baseline locked.");
        
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
        if (claimParams.containsKey("days_lost")) {
            actualLossPayout = Double.parseDouble(claimParams.get("days_lost").toString()) * 850.00;
        } 
        actualLossPayout = Math.max(300.00, Math.min(2500.00, actualLossPayout));
        
        String triggerType = claimParams.getOrDefault("trigger_type", "MANUAL_SIMULATOR").toString();
        String activeUpi = workerDatabase.containsKey("upiId") ? workerDatabase.get("upiId").toString() : "UNLINKED-UPI";
        
        String logEntry = "🚨 Executed Event [" + triggerType + "]. Disbursed: ₹" + actualLossPayout + " instantaneously to UPI: " + activeUpi;
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
