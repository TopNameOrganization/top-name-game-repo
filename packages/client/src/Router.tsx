import { Routes, Route } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
import { PublicRoutes } from './PublicRoutes'
import { ROUTES } from './constants'
import * as Pages from './pages'

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Pages.HomePage />} />
      <Route element={<PublicRoutes />}>
        <Route path={ROUTES.login} element={<Pages.SignInPage />} />
        <Route path={ROUTES.signup} element={<Pages.SignUpPage />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path={ROUTES.game} element={<Pages.GamePage />} />
        <Route path={ROUTES.profile} element={<Pages.ProfilePage />} />
        <Route path={ROUTES.leaderBoard} element={<Pages.LeaderBoardPage />} />
      </Route>
      <Route path="*" element={<Pages.NotFoundPage />} />
    </Routes>
  )
}
