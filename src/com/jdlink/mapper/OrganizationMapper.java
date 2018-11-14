package com.jdlink.mapper;

import com.jdlink.domain.Produce.Organization;

import java.util.List;

public interface OrganizationMapper {

    List<Organization> listCompany();

    List<Organization> listDepartment();

    List<Organization> listTeam();

    void addCompanyName(Organization organization);

    void addDepartment(Organization organization);

    void addTeam(Organization organization);

    void updateCompanyName(Organization organization);

    void updateDepartment(Organization organization);

    void updateTeam(Organization organization);

    void deleteCompanyName(Organization organization);

    void deleteDepartment(Organization organization);

    void deleteTeam(Organization organization);

    int countDepartment(int id);

    int countTeam(int id);

    Organization getDepartmentById(int id);

    Organization getTeamById(int id);

}
