package com.jdlink.service.produce.impl;

import com.jdlink.domain.Approval.ApprovalNode;
import com.jdlink.domain.Approval.ApprovalProcess;
import com.jdlink.domain.Produce.Organization;
import com.jdlink.mapper.produce.ApprovalManageMapper;
import com.jdlink.service.produce.ApprovalManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApprovalManageServiceImpl implements ApprovalManageService {

    @Autowired
    ApprovalManageMapper approvalManageMapper;

    @Override
    public List<ApprovalProcess> search(ApprovalProcess approvalProcess){ return approvalManageMapper.search(approvalProcess); }

    @Override
    public int searchTotal(ApprovalProcess approvalProcess) { return approvalManageMapper.searchTotal(approvalProcess); }

    @Override

    public ApprovalProcess getApprovalProcessByOrderId(String orderId) {
        return approvalManageMapper.getApprovalProcessByOrderId(orderId);
    }

    @Override
    public ApprovalNode getNodeByIdAndRoleId(int id, String roleId) {
        return approvalManageMapper.getNodeByIdAndRoleId(id, roleId);
    }

    @Override
    public void updateApprovalById(String id, int stateId) {
        approvalManageMapper.updateApprovalById(id, stateId);
    }

    public List<Organization> getUrlList() { return approvalManageMapper.getUrlList(); }



}
