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

    public List<Organization> getUrlList() {
        return approvalManageMapper.getUrlList();
    }

    @Override
    public ApprovalProcess getApprovalProcessModelById(int id) { return approvalManageMapper.getApprovalProcessModelById(id); }

    @Override
    public void deleteModelById(int id) {
        approvalManageMapper.deleteModelNotesByApprovalProcessId(id);   // 删除节点
        approvalManageMapper.deleteModelProcessByApprovalProcessId(id);   // 删除流
    }

    @Override
    public void updateModelProcessById(ApprovalProcess approvalProcess) {
        approvalManageMapper.deleteModelNotesByApprovalProcessId(approvalProcess.getId());   // 删除节点
        approvalManageMapper.updateApprovalProcessById(approvalProcess);   // 更新审批流外层数据
        if(approvalProcess.getApprovalNodeList() != null && approvalProcess.getApprovalNodeList().size() > 0) {
            for(ApprovalNode approvalNode : approvalProcess.getApprovalNodeList()) {
                 approvalManageMapper.addApprovalNode(approvalNode);   // 新增节点
            }
        }

    }

    @Override
    public void addApprovalModel(ApprovalProcess approvalProcess) {
        approvalManageMapper.addApprovalProcess(approvalProcess);
        if(approvalProcess.getApprovalNodeList() != null && approvalProcess.getApprovalNodeList().size() > 0) {
            for(ApprovalNode approvalNode : approvalProcess.getApprovalNodeList()) {
                approvalManageMapper.addApprovalNode(approvalNode);
            }
        }
    }

    @Override
    public void updateApprovalProcessModelUrlById(ApprovalProcess approvalProcess) {
        approvalManageMapper.deleteUrlByApprovalProcessId(approvalProcess.getId());   // 删除之前链接
        approvalManageMapper.addApprovalProcessModelUrl(approvalProcess);           // 新增当前的链接
    }

    @Override
    public ApprovalProcess getOrderIdAndUrlByRoleId(int id) {
        return approvalManageMapper.getOrderIdAndUrlByRoleId(id);
    }

}
