import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";

export function Signup() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-screen">
            <Auth type="signup"></Auth>
        </div>
        <div className="">
          <Quote />
        </div>
      </div>
    </div>
  );
}
