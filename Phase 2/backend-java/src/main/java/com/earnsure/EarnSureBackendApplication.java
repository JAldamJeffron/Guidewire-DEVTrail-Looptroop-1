package com.earnsure;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.UUID;

@SpringBootApplication
@RestController
@RequestMapping("/api")
public class EarnSureBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EarnSureBackendApplication.class, args);
    }

    /**
     * Endpoint 1: Registers the delivery worker
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerWorker(@RequestBody Map<String, Object> data) {
        String workerId = "WK-" + UUID.randomUUID().toString().substring(0,8).toUpperCase();
        return ResponseEntity.ok(Map.of(
            "status", "SUCCESS", 
            "worker_id", workerId, 
            "message", "Delivery partner successfully registered to ML shield."
        ));
    }

    /**
     *  Endpoint 2: Activates the weekly ₹45/₹50 shield
     */
    @PostMapping("/policy/activate")
    public ResponseEntity<?> activatePolicy(@RequestBody Map<String, Object> data) {
        return ResponseEntity.ok(Map.of(
            "status", "ACTIVE", 
            "message", "Weekly premium activated. Rider is protected from disruptions."
        ));
    }

    /**
     * Endpoint 3: Executes the zero-touch claim payout via simulated UPI
     */
    @PostMapping("/claims/process")
    public ResponseEntity<?> processClaim(@RequestBody Map<String, Object> claimParams) {
        return ResponseEntity.ok(Map.of(
            "status", "PAYOUT_INITIATED", 
            "message", "Loss of Income detected. Instant UPI transfer initiated.", 
            "receipt_id", "UPI-" + UUID.randomUUID().toString()
        ));
    }
}
