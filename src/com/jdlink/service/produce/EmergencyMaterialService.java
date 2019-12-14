package com.jdlink.service.produce;

import com.jdlink.domain.Inventory.EmergencyMaterial;
import com.jdlink.domain.Page;

import java.util.List;

public interface EmergencyMaterialService {

    void addEmergencyMaterial(EmergencyMaterial emergencyMaterial);

    List<EmergencyMaterial> loadEmergencyTSList(Page page);

    EmergencyMaterial getEmergencyTSById(String planId);

    void updateEmergencyTS(EmergencyMaterial emergencyMaterial);

    void setEmergencyMaterialFilePath(EmergencyMaterial EmergencyMaterial);

    int loadEmergencyMaterialCount();

    List<EmergencyMaterial> searchEmergencyMaterial(EmergencyMaterial emergencyMaterial);

    int searchEmergencyMaterialCount(EmergencyMaterial emergencyMaterial);

    void approvalEmergencyMaterial(String planId);

    void setEmergencyTSToExamine(String planId);

    void setEmergencyToApproval(String planId);

    void setEmergencyToBack(String planId);
}
