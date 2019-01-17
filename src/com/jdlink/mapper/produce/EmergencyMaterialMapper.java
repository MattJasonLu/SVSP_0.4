package com.jdlink.mapper.produce;

import com.jdlink.domain.Inventory.EmergencyMaterial;
import com.jdlink.domain.Page;

import java.util.List;

public interface EmergencyMaterialMapper {

    void addEmergencyMaterial(EmergencyMaterial emergencyMaterial);

    List<EmergencyMaterial>loadEmergencyTSList(Page page);
}
