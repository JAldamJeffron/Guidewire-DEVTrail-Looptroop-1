package com.earnsure.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class ParametricTriggerService {

    /**
     * Fulfills: 3-5 Automated Triggers running every 60 seconds
     */
    @Scheduled(fixedRate = 60000)
    public void pollMockAPIs() {
        System.out.println("[Trigger Polling] Running every 60s to check 4 Mock Phase 2 APIs...");

        // 1. Weather API (checking for heavy rain/floods in regions like Chennai)
        if (checkApiStatus("WEATHER")) {
            executeZeroTouchClaim("WEATHER_CRITICAL", "Heavy Rain/Floods isolated in Chennai block. Deliveries halted.");
        }

        // 2. Grid API (checking if dark store power is offline)
        if (checkApiStatus("GRID")) {
            executeZeroTouchClaim("GRID_CRITICAL", "BlinkIt Dark Store #42 offline due to power grid collapse.");
        }

        // 3. Pollution API (checking for hazardous AQI)
        if (checkApiStatus("POLLUTION")) {
            executeZeroTouchClaim("POLLUTION_CRITICAL", "AQI spiked past safe working standards. Authorities halted deliveries.");
        }

        // 4. Civic API (checking for unplanned curfews)
        if (checkApiStatus("CIVIC")) {
            executeZeroTouchClaim("CIVIC_CRITICAL", "Sudden municipal curfew activated. Area restricted.");
        }

        // 5. Geopolitical API (checking for petroleum shortage due to war)
        if (checkApiStatus("GEOPOLITICAL")) {
            executeZeroTouchClaim("FUEL_SHORTAGE_CRITICAL", "War-induced petroleum scarcity. Commercial fuel access blocked.");
        }
    }

    /**
     * Simulated mock polling endpoint (Returns 'CRITICAL' occasionally)
     */
    private boolean checkApiStatus(String triggerType) {
        // Mocks a sudden 'CRITICAL' response from external dependencies
        return Math.random() > 0.98;
    }

    private void executeZeroTouchClaim(String triggerId, String reason) {
        System.out.println("🚨 MOCK API TRIGGERED CRITICAL STATE: " + triggerId);
        System.out.println("🚨 DISRUPTION REASON: " + reason);
        System.out.println("💸 ACTION: Calling Claims Management system... executing Zero-Touch Payouts instantly.");
    }
}
