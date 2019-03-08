package com.jdlink.service.produce;

import com.jdlink.domain.Approval.ApprovalNode;
import com.jdlink.domain.Approval.ApprovalProcess;

import java.util.List;

public interface ApprovalManageService {

    List<ApprovalProcess> search(ApprovalProcess approvalProcess);

    int searchTotal(ApprovalProcess approvalProcess);

    ApprovalProcess getApprovalProcessByOrderId(String orderId);

    ApprovalNode getNodeByIdAndRoleId(int id,String roleId);

    void updateApprovalById(String id,int stateId);
}
