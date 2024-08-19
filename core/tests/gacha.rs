#[cfg(test)]
mod test {

    use jinhsi_core::gacha::{GachaLog, GachaLogItem};
    use serde::{Deserialize, Serialize};

    #[derive(Debug, Serialize, Deserialize)]
    struct GachaResponse<T: Serialize> {
        code: i32,
        data: T,
        message: String,
    }

    fn load_test_case(json: &str) -> GachaLog {
        let data_response: GachaResponse<Vec<GachaLogItem>> = serde_json::from_str(json).unwrap();
        return GachaLog::new(
            jinhsi_core::gacha::Convene::EventCharacter,
            data_response.data,
        );
    }

    fn subtest_merge_gacha_log(base_record: &str, other_record: &str, full_record: &GachaLog) {
        {
            let base = load_test_case(base_record);
            let other = load_test_case(other_record);
            let merged_record = base.merge(&other).unwrap();
            assert_eq!(merged_record, *full_record)
        }
        //Reverse
        {
            let other = load_test_case(base_record);
            let base = load_test_case(other_record);
            let merged_record = base.merge(&other).unwrap();
            assert_eq!(merged_record, *full_record)
        }
    }
    #[test]
    fn test_merge_gacha_log() {
        let full_record = load_test_case(include_str!("./data/gacha/full_record.json"));
        // Split1
        {
            subtest_merge_gacha_log(
                include_str!("./data/gacha/split1/base.json"),
                include_str!("./data/gacha/split1/other.json"),
                &full_record,
            )
        }
        // Split2
        {
            subtest_merge_gacha_log(
                include_str!("./data/gacha/split2/base.json"),
                include_str!("./data/gacha/split2/other.json"),
                &full_record,
            )
        }
        // Split3
        {
            subtest_merge_gacha_log(
                include_str!("./data/gacha/split3/base.json"),
                include_str!("./data/gacha/split3/other.json"),
                &full_record,
            )
        }
    }
}
