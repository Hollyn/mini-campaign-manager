import { AUTH_COPY } from '../../constants/auth'
import { Alert } from '../ui/alert'

interface AuthErrorBannerProps {
  message: string
}

export const AuthErrorBanner = ({ message }: AuthErrorBannerProps) => (
  <Alert className="space-y-1" variant="destructive">
    <p className="font-medium">{AUTH_COPY.genericError}</p>
    <p className="text-xs text-on-error-container/85">{message}</p>
  </Alert>
)
