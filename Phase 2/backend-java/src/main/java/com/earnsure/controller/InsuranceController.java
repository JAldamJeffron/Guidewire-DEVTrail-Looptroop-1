package com.earnsure.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/insurance")
public class InsuranceController {

    /**
     * 1. Registration Process
     * Establishes the driver in the DB, tying their UID to telemetry components.
     */
    @PostMapping("/register-worker")
    public ResponseEntity<?> registerWorker(@RequestBody Map<String, Object> workerData) {
        // Database ORM implementation would persist rider ID securely here.
        String workerId = "WK-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return ResponseEntity.ok(Map.of(
            "status", "SUCCESS",
            "message", "Q-Commerce Worker registered.",
            "worker_id", workerId
        ));
    }

    /**
     * 2. Insurance Policy Management
     * Handles activation logic of the weekly calculated premium.
     */
    @PostMapping("/policy/activate")
    public ResponseEntity<?> activatePolicy(@RequestParam String workerId, @RequestParam double mlCalculatedPremium) {
        // Here we handle UPI webhook confirmations confirming the premium transfer is successful
        return ResponseEntity.ok(Map.of(
            "status", "ACTIVE",
            "message", "Zero-Touch Shield activated for the next 7 days.",
            "worker_id", workerId,
            "premium_paid_inr", mlCalculatedPremium
        ));
    }

    /**
     * 3. Claims Management Dashboard Feed
     * For application UI usage, lists previous successful autonomous payouts.
     */
    @GetMapping("/claims/{workerId}")
    public ResponseEntity<?> getClaims(@PathVariable String workerId) {
        // Exposes data exclusively read-only since creation occurs directly inside 'TriggerPollingService.java'
        return ResponseEntity.ok(Map.of(
            "worker_id", workerId,
            "overall_protection_payouts", 1,
            "claims", new Object[] {
                Map.of(
                    "date", "2026-04-02", 
                    "trigger_type", "EXTREME_WEATHER", 
                    "payout_value_inr", 350.0, 
                    "status", "SETTLED_VIA_UPI"
                )
            }
        ));
    }
}
