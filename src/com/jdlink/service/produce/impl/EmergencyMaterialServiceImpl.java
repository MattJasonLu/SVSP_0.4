package com.jdlink.service.produce.impl;

import com.jdlink.domain.Inventory.EmergencyMaterial;
import com.jdlink.domain.Page;
import com.jdlink.mapper.produce.EmergencyMaterialMapper;
import com.jdlink.service.produce.EmergencyMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmergencyMaterialServiceImpl implements EmergencyMaterialService {
    @Autowired
    EmergencyMaterialMapper emergencyMaterialMapper;

    @Override
    public void addEmergencyMaterial(EmergencyMaterial emergencyMaterial) {
        emergencyMaterialMapper.addEmergencyMaterial(emergencyMaterial);
    }

    @Override
    public List<EmergencyMaterial> loadEmergencyTSList(Page page) {
        return emergencyMaterialMapper.loadEmergencyTSList(page);
    }
}
