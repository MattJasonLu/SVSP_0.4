package com.jdlink.mapper.produce;

import com.jdlink.domain.Approval.ApprovalNode;
import com.jdlink.domain.Approval.ApprovalProcess;
import com.jdlink.domain.Produce.Organization;

import java.util.List;

/**
 * 审批流管理
 */
public interface ApprovalManageMapper {

    List<ApprovalProcess> search(ApprovalProcess approvalProcess);

    int searchTotal(ApprovalProcess approvalProcess);

    ApprovalProcess getApprovalProcessByOrderId(String orderId);

    ApprovalNode getNodeByIdAndRoleId(int id,String roleId);

    void updateApprovalById(String id,int stateId);

    void updateApprovalProcessById(ApprovalProcess approvalProcess);

    List<Organization> getUrlList();

    ApprovalProcess getApprovalProcessModelById(int id);

    void deleteModelNotesByApprovalProcessId(int id);

    void deleteModelProcessByApprovalProcessId(int id);

    void addApprovalNode(ApprovalNode approvalNode);

    void addApprovalProcess(ApprovalProcess approvalProcess);

    void deleteUrlByApprovalProcessId(int id);

    void addApprovalProcessModelUrl(ApprovalProcess approvalProcess);

    ApprovalProcess getOrderIdAndUrlByRoleId(int id);

}
