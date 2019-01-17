package com.jdlink.service.produce;

import com.jdlink.domain.Inventory.EmergencyMaterial;
import com.jdlink.domain.Page;

import java.util.List;

public interface EmergencyMaterialService {

    void addEmergencyMaterial(EmergencyMaterial emergencyMaterial);

    List<EmergencyMaterial> loadEmergencyTSList(Page page);
}
