import { env } from '../config/env'
import { recoverSendingCampaigns, runScheduledCampaignSweep } from './campaign-service'

const runCampaignProcessingSweep = async () => {
  await runScheduledCampaignSweep()
  await recoverSendingCampaigns()
}

export const startCampaignProcessing = async () => {
  let isSweepRunning = false

  const runSweep = async () => {
    if (isSweepRunning) {
      return
    }

    isSweepRunning = true

    try {
      await runCampaignProcessingSweep()
    } catch (error) {
      console.error('Campaign processing sweep failed', error)
    } finally {
      isSweepRunning = false
    }
  }

  await runSweep()

  const intervalHandle = setInterval(() => {
    void runSweep()
  }, env.CAMPAIGN_PROCESSOR_POLL_MS)

  intervalHandle.unref()

  return () => {
    clearInterval(intervalHandle)
  }
}
