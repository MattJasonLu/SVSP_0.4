package com.jdlink.service;

import com.jdlink.domain.Produce.Organization;

import java.util.List;

public interface FirstPageConfigurationService {

    void addPage(Organization organization);

    List<Integer> getByMenuNameAndRoleId(Organization organization);
}
