package com.earnsure.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Random;

@Service
public class TriggerPollingService {

    private static final Logger log = LoggerFactory.getLogger(TriggerPollingService.class);
    private final ClaimService claimService;
    private final Random random = new Random();

    public TriggerPollingService(ClaimService claimService) {
        this.claimService = claimService;
    }

    /**
     * Engine Background Poller.
     * Runs continuously globally to evaluate conditions on real-world APIs.
     * Triggers zero-touch parametric payouts immediately upon disruption validation.
     */
    @Scheduled(fixedRate = 30000)
    public void monitorDisruptionTriggers() {
        log.info("[Automation Engine] Polling external telemetry sources...");

        if (checkWeatherAPI()) {
            executePayouts("EXTREME_WEATHER", "Severe rain/waterlogging detected matching trigger condition > 120mm.");
        }
        
        if (checkInfrastructureAPI()) {
            executePayouts("GRID_FAILURE", "Dark Store Telemetry reports grid outage exceeding 30 minutes threshold.");
        }
        
        if (checkEnvironmentAPI()) {
            executePayouts("SEVERE_POLLUTION", "Real-time AQI crossed 450 (Hazardous). Civic operations blocked.");
        }
        
        if (checkMunicipalAPI()) {
            executePayouts("CIVIC_DISRUPTION", "Sudden Tier 1 curfew invoked for local municipality.");
        }
    }

    private void executePayouts(String triggerType, String reason) {
        log.warn("🚨 AUTOMATED OUTAGE TRIGGER ACTIVATED: {} - {}", triggerType, reason);
        // Fires off the claim chain autonomously (Golden Rule of Zero-touch).
        claimService.processZeroTouchClaims(triggerType, reason);
    }

    // ====================================
    // Mock External APIs Data Evaluators 
    // ====================================

    private boolean checkWeatherAPI() {
        // Trigger 1: Environmental Hazard Tracker
        // Simulates connection to OpenWeather or IMD
        return random.nextDouble() > 0.96; 
    }

    private boolean checkInfrastructureAPI() {
        // Trigger 2: Q-Commerce Platform Status Webhooks
        // Simulates receiving API hits about local Zepto/Blinkit warehouse power failures
        return random.nextDouble() > 0.98;
    }

    private boolean checkEnvironmentAPI() {
        // Trigger 3: CPCB Pollution Node validation
        // Triggers strictly on AQI exceeding pre-defined parametric bounds
        return random.nextDouble() > 0.99;
    }

    private boolean checkMunicipalAPI() {
        // Trigger 4: General Social & Civic blockades
        return random.nextDouble() > 0.99;
    }
}
